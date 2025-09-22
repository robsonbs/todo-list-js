/**
 * Aula 8: Utilitários e Melhorias de Performance
 * Funções auxiliares para otimização e UX
 */

// === Performance Utilities ===
class PerformanceUtils {
  static measureTime(name, fn) {
    return new Promise((resolve) => {
      const start = performance.now();
      const result = fn();

      if (result instanceof Promise) {
        result.then((data) => {
          const end = performance.now();
          resolve({
            name,
            time: end - start,
            data,
          });
        });
      } else {
        const end = performance.now();
        resolve({
          name,
          time: end - start,
          data: result,
        });
      }
    });
  }

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  static requestIdleCallback(callback, options = {}) {
    if ("requestIdleCallback" in window) {
      return window.requestIdleCallback(callback, options);
    } else {
      // Fallback para navegadores sem suporte
      return setTimeout(() => {
        callback({
          didTimeout: false,
          timeRemaining: () => 50,
        });
      }, 1);
    }
  }
}

// === DOM Utilities ===
class DOMUtils {
  static createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }

  static isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  }

  static getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  static animateElement(element, keyframes, options = {}) {
    if ("animate" in element) {
      return element.animate(keyframes, {
        duration: 300,
        easing: "ease-out",
        fill: "forwards",
        ...options,
      });
    } else {
      // Fallback para navegadores sem Web Animations API
      return new Promise((resolve) => {
        setTimeout(resolve, options.duration || 300);
      });
    }
  }
}

// === Storage Utilities ===
class StorageUtils {
  static setItem(key, value, options = {}) {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        expires: options.expires || null,
      };

      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn("Storage not available:", error);
      return false;
    }
  }

  static getItem(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const data = JSON.parse(item);

      // Verificar expiração
      if (data.expires && Date.now() > data.expires) {
        localStorage.removeItem(key);
        return null;
      }

      return data.value;
    } catch (error) {
      console.warn("Error reading from storage:", error);
      return null;
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn("Error removing from storage:", error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn("Error clearing storage:", error);
      return false;
    }
  }

  static getSize() {
    let total = 0;
    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
    } catch (error) {
      console.warn("Error calculating storage size:", error);
    }
    return total;
  }
}

// === Animation Utilities ===
class AnimationUtils {
  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  static easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  static easeIn(t) {
    return t * t * t;
  }

  static linear(t) {
    return t;
  }

  static bounce(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  }

  static animate(from, to, duration, easing = "easeOut", callback) {
    const startTime = performance.now();
    const easingFunction = this[easing] || this.easeOut;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunction(progress);

      const current = from + (to - from) * easedProgress;
      callback(current, progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}

// === Notification System ===
class NotificationSystem {
  constructor() {
    this.container = null;
    this.notifications = new Map();
    this.createContainer();
  }

  createContainer() {
    this.container = DOMUtils.createElement("div", {
      className: "notification-container",
      style:
        "position: fixed; top: 20px; right: 20px; z-index: 9999; pointer-events: none;",
    });
    document.body.appendChild(this.container);
  }

  show(message, type = "info", duration = 3000) {
    const id = Date.now() + Math.random();

    const notification = DOMUtils.createElement(
      "div",
      {
        className: `notification notification-${type}`,
        style: `
                background: var(--${type === "error" ? "danger" : type}-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                transform: translateX(100%);
                transition: all 0.3s ease;
                pointer-events: auto;
                cursor: pointer;
                max-width: 300px;
                word-wrap: break-word;
            `,
      },
      [message]
    );

    // Evento de clique para fechar
    notification.addEventListener("click", () => {
      this.hide(id);
    });

    this.container.appendChild(notification);
    this.notifications.set(id, notification);

    // Animação de entrada
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
    });

    // Auto-hide
    if (duration > 0) {
      setTimeout(() => {
        this.hide(id);
      }, duration);
    }

    return id;
  }

  hide(id) {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.style.transform = "translateX(100%)";
      notification.style.opacity = "0";

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        this.notifications.delete(id);
      }, 300);
    }
  }

  success(message, duration) {
    return this.show(`✅ ${message}`, "success", duration);
  }

  error(message, duration) {
    return this.show(`❌ ${message}`, "error", duration);
  }

  warning(message, duration) {
    return this.show(`⚠️ ${message}`, "warning", duration);
  }

  info(message, duration) {
    return this.show(`ℹ️ ${message}`, "info", duration);
  }
}

// === Loading System ===
class LoadingSystem {
  constructor() {
    this.overlay = null;
    this.activeLoaders = new Set();
  }

  show(message = "Carregando...", target = document.body) {
    const id = Date.now() + Math.random();

    const loader = DOMUtils.createElement(
      "div",
      {
        className: "loading-overlay",
        style: `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                z-index: 1000;
                backdrop-filter: blur(2px);
            `,
      },
      [
        DOMUtils.createElement("div", {
          className: "loading-spinner",
          style: `
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 1rem;
                `,
        }),
        DOMUtils.createElement(
          "p",
          {
            style: "margin: 0; color: var(--dark-color); font-weight: 600;",
          },
          [message]
        ),
      ]
    );

    // Adicionar posição relativa ao target se necessário
    const targetStyle = window.getComputedStyle(target);
    if (targetStyle.position === "static") {
      target.style.position = "relative";
    }

    target.appendChild(loader);
    this.activeLoaders.add({ id, loader, target });

    return id;
  }

  hide(id) {
    const loaderData = Array.from(this.activeLoaders).find((l) => l.id === id);
    if (loaderData) {
      const { loader, target } = loaderData;

      loader.style.opacity = "0";
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
        this.activeLoaders.delete(loaderData);
      }, 200);
    }
  }

  hideAll() {
    this.activeLoaders.forEach(({ id }) => {
      this.hide(id);
    });
  }
}

// === Error Handler ===
class ErrorHandler {
  constructor(notificationSystem) {
    this.notifications = notificationSystem;
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    window.addEventListener("error", (event) => {
      console.error("Global Error:", event.error);
      this.handleError(event.error, "Erro inesperado na aplicação");
    });

    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled Promise Rejection:", event.reason);
      this.handleError(event.reason, "Erro em operação assíncrona");
    });
  }

  handleError(error, userMessage = "Ocorreu um erro") {
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isDevelopment) {
      this.notifications.error(`${userMessage}: ${error.message}`);
    } else {
      this.notifications.error(userMessage);
    }

    // Log detalhado para debug
    console.group("🚨 Error Details");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("User Message:", userMessage);
    console.groupEnd();
  }

  wrapAsync(fn, errorMessage = "Erro na operação") {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        this.handleError(error, errorMessage);
        throw error;
      }
    };
  }

  wrapSync(fn, errorMessage = "Erro na operação") {
    return (...args) => {
      try {
        return fn(...args);
      } catch (error) {
        this.handleError(error, errorMessage);
        throw error;
      }
    };
  }
}

// === Instâncias Globais ===
window.utils = {
  performance: PerformanceUtils,
  dom: DOMUtils,
  storage: StorageUtils,
  animation: AnimationUtils,
  notifications: new NotificationSystem(),
  loading: new LoadingSystem(),
  errorHandler: null,
};

// Inicializar error handler
window.utils.errorHandler = new ErrorHandler(window.utils.notifications);

// Exportar para uso em outras partes do código
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.utils;
}
