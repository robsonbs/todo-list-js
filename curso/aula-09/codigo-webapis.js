/* ============================================================================
   🌐 AULA 9: WEB APIs MODERNAS - CÓDIGO PROGRESSIVO
   ============================================================================
   
   Demonstrações práticas de APIs modernas do navegador:
   • Geolocation API - Localização do usuário
   • Notification API - Notificações nativas
   • Web Speech API - Reconhecimento e síntese de voz
   • WebRTC - Comunicação peer-to-peer
   • Camera/MediaStream API - Acesso à câmera e microfone
   • Web Workers - Processamento em background
   • Service Workers - Cache e offline
   • WebGL - Gráficos 3D acelerados
   
   Autor: Sistema de Educação JavaScript
   Data: Setembro 2025
   ============================================================================ */

// ============================================================================
// 🌍 DEMONSTRAÇÃO 1: GEOLOCATION API
// ============================================================================

class Demo1_GeolocationAPI {
  constructor() {
    this.watchId = null;
    this.map = null;
    this.marker = null;
    this.init();
  }

  init() {
    console.log("🌍 Demo 1: Geolocation API inicializada");
    this.setupControls();
    this.checkSupport();
  }

  checkSupport() {
    const supported = "geolocation" in navigator;
    const statusElement = document.getElementById("geolocation-status");

    if (statusElement) {
      statusElement.innerHTML = supported
        ? `<span class="text-success">✅ Geolocation API suportada</span>`
        : `<span class="text-danger">❌ Geolocation API não suportada</span>`;
    }

    return supported;
  }

  setupControls() {
    const btnGetLocation = document.getElementById("btn-get-location");
    const btnWatchLocation = document.getElementById("btn-watch-location");
    const btnStopWatch = document.getElementById("btn-stop-watch");

    if (btnGetLocation) {
      btnGetLocation.addEventListener("click", () => this.getCurrentPosition());
    }

    if (btnWatchLocation) {
      btnWatchLocation.addEventListener("click", () => this.watchPosition());
    }

    if (btnStopWatch) {
      btnStopWatch.addEventListener("click", () => this.stopWatching());
    }
  }

  getCurrentPosition() {
    if (!this.checkSupport()) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    this.showLoading("location-result");

    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocationSuccess(position),
      (error) => this.onLocationError(error),
      options
    );
  }

  watchPosition() {
    if (!this.checkSupport()) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000,
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.onLocationUpdate(position),
      (error) => this.onLocationError(error),
      options
    );

    this.updateWatchStatus(true);
  }

  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.updateWatchStatus(false);
    }
  }

  onLocationSuccess(position) {
    const { latitude, longitude, accuracy } = position.coords;
    const timestamp = new Date(position.timestamp);

    this.displayLocationInfo({
      latitude,
      longitude,
      accuracy,
      timestamp,
    });

    // Simular mapa (substitua por implementação real de mapa)
    this.updateMap(latitude, longitude);
  }

  onLocationUpdate(position) {
    this.onLocationSuccess(position);
    this.addLocationToHistory(position);
  }

  onLocationError(error) {
    const errorMessages = {
      1: "Permissão negada pelo usuário",
      2: "Localização indisponível",
      3: "Timeout na requisição",
    };

    const message = errorMessages[error.code] || "Erro desconhecido";
    this.showError("location-result", `Erro: ${message}`);
  }

  displayLocationInfo(location) {
    const resultElement = document.getElementById("location-result");
    if (!resultElement) return;

    resultElement.innerHTML = `
            <div class="location-info">
                <h5><i class="fas fa-map-marker-alt"></i> Localização Atual</h5>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Latitude:</strong> ${location.latitude.toFixed(
                          6
                        )}°
                    </div>
                    <div class="info-item">
                        <strong>Longitude:</strong> ${location.longitude.toFixed(
                          6
                        )}°
                    </div>
                    <div class="info-item">
                        <strong>Precisão:</strong> ±${Math.round(
                          location.accuracy
                        )}m
                    </div>
                    <div class="info-item">
                        <strong>Timestamp:</strong> ${location.timestamp.toLocaleString()}
                    </div>
                </div>
                <button onclick="demo1.copyCoordinates(${location.latitude}, ${
      location.longitude
    })" class="btn btn-sm btn-outline-primary mt-2">
                    <i class="fas fa-copy"></i> Copiar Coordenadas
                </button>
            </div>
        `;
  }

  updateMap(lat, lng) {
    const mapElement = document.getElementById("location-map");
    if (!mapElement) return;

    // Placeholder para mapa - implementar com Leaflet ou Google Maps
    mapElement.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-map fa-3x text-primary"></i>
                <p class="mt-2">Mapa seria exibido aqui</p>
                <small>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}</small>
            </div>
        `;
  }

  updateWatchStatus(watching) {
    const statusElement = document.getElementById("watch-status");
    if (statusElement) {
      statusElement.innerHTML = watching
        ? `<span class="text-warning">📍 Monitorando localização...</span>`
        : `<span class="text-muted">⏹️ Monitoramento parado</span>`;
    }
  }

  addLocationToHistory(position) {
    const historyElement = document.getElementById("location-history");
    if (!historyElement) return;

    const { latitude, longitude } = position.coords;
    const timestamp = new Date(position.timestamp);

    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerHTML = `
            <small>${timestamp.toLocaleTimeString()}</small>
            <span>${latitude.toFixed(4)}, ${longitude.toFixed(4)}</span>
        `;

    historyElement.insertBefore(historyItem, historyElement.firstChild);

    // Limitar histórico a 10 itens
    while (historyElement.children.length > 10) {
      historyElement.removeChild(historyElement.lastChild);
    }
  }

  copyCoordinates(lat, lng) {
    const coordinates = `${lat}, ${lng}`;
    navigator.clipboard.writeText(coordinates).then(() => {
      this.showNotification("Coordenadas copiadas!", "success");
    });
  }

  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
                <div class="text-center p-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Carregando...</span>
                    </div>
                    <p class="mt-2">Obtendo localização...</p>
                </div>
            `;
    }
  }

  showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    ${message}
                </div>
            `;
    }
  }

  showNotification(message, type = "info") {
    if (window.utils && window.utils.notifications) {
      window.utils.notifications.show(message, type);
    }
  }
}

// ============================================================================
// 🔔 DEMONSTRAÇÃO 2: NOTIFICATION API
// ============================================================================

class Demo2_NotificationAPI {
  constructor() {
    this.permission = null;
    this.notifications = [];
    this.init();
  }

  init() {
    console.log("🔔 Demo 2: Notification API inicializada");
    this.checkSupport();
    this.setupControls();
    this.updatePermissionStatus();
  }

  checkSupport() {
    const supported = "Notification" in window;
    const statusElement = document.getElementById("notification-status");

    if (statusElement) {
      statusElement.innerHTML = supported
        ? `<span class="text-success">✅ Notification API suportada</span>`
        : `<span class="text-danger">❌ Notification API não suportada</span>`;
    }

    return supported;
  }

  setupControls() {
    const btnRequestPermission = document.getElementById(
      "btn-request-permission"
    );
    const btnSimpleNotification = document.getElementById(
      "btn-simple-notification"
    );
    const btnRichNotification = document.getElementById(
      "btn-rich-notification"
    );
    const btnPersistentNotification = document.getElementById(
      "btn-persistent-notification"
    );

    if (btnRequestPermission) {
      btnRequestPermission.addEventListener("click", () =>
        this.requestPermission()
      );
    }

    if (btnSimpleNotification) {
      btnSimpleNotification.addEventListener("click", () =>
        this.showSimpleNotification()
      );
    }

    if (btnRichNotification) {
      btnRichNotification.addEventListener("click", () =>
        this.showRichNotification()
      );
    }

    if (btnPersistentNotification) {
      btnPersistentNotification.addEventListener("click", () =>
        this.showPersistentNotification()
      );
    }
  }

  async requestPermission() {
    if (!this.checkSupport()) return;

    try {
      this.permission = await Notification.requestPermission();
      this.updatePermissionStatus();

      if (this.permission === "granted") {
        this.showSimpleNotification(
          "Permissão concedida!",
          "Agora você receberá notificações."
        );
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error);
    }
  }

  updatePermissionStatus() {
    this.permission = Notification.permission;
    const statusElement = document.getElementById("permission-status");

    if (statusElement) {
      const statusText = {
        granted: '<span class="text-success">✅ Concedida</span>',
        denied: '<span class="text-danger">❌ Negada</span>',
        default: '<span class="text-warning">⏳ Pendente</span>',
      };

      statusElement.innerHTML = statusText[this.permission] || "Desconhecido";
    }
  }

  showSimpleNotification(
    title = "Notificação Simples",
    body = "Esta é uma notificação básica"
  ) {
    if (!this.checkPermission()) return;

    const notification = new Notification(title, {
      body,
      icon: "https://via.placeholder.com/64x64/007bff/ffffff?text=JS",
    });

    this.trackNotification(notification, "simple");
  }

  showRichNotification() {
    if (!this.checkPermission()) return;

    const notification = new Notification("Notificação Avançada", {
      body: "Esta notificação possui mais funcionalidades",
      icon: "https://via.placeholder.com/64x64/28a745/ffffff?text=+",
      badge: "https://via.placeholder.com/24x24/ffc107/000000?text=!",
      image: "https://via.placeholder.com/360x180/17a2b8/ffffff?text=Imagem",
      tag: "rich-notification",
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "👀 Ver",
          icon: "https://via.placeholder.com/24x24/007bff/ffffff?text=V",
        },
        {
          action: "close",
          title: "❌ Fechar",
          icon: "https://via.placeholder.com/24x24/dc3545/ffffff?text=X",
        },
      ],
      data: {
        url: "https://example.com",
        timestamp: Date.now(),
      },
    });

    notification.onclick = (event) => {
      console.log("Notificação clicada:", event);
      notification.close();
    };

    this.trackNotification(notification, "rich");
  }

  showPersistentNotification() {
    if (!("serviceWorker" in navigator)) {
      alert("Service Workers não suportados para notificações persistentes");
      return;
    }

    // Placeholder para Service Worker notification
    this.showSimpleNotification(
      "Notificação Persistente",
      "Esta seria uma notificação persistente via Service Worker"
    );
  }

  checkPermission() {
    if (Notification.permission !== "granted") {
      alert('Permissão necessária! Clique em "Solicitar Permissão" primeiro.');
      return false;
    }
    return true;
  }

  trackNotification(notification, type) {
    const notificationData = {
      id: Date.now(),
      type,
      title: notification.title,
      timestamp: new Date(),
      notification,
    };

    this.notifications.push(notificationData);
    this.updateNotificationLog();

    // Auto-close após 5 segundos (exceto para rich notifications)
    if (type !== "rich") {
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  }

  updateNotificationLog() {
    const logElement = document.getElementById("notification-log");
    if (!logElement) return;

    logElement.innerHTML = this.notifications
      .slice(-10) // Últimas 10 notificações
      .reverse()
      .map(
        (notif) => `
                <div class="notification-log-item">
                    <div class="d-flex justify-content-between">
                        <strong>${notif.title}</strong>
                        <small>${notif.timestamp.toLocaleTimeString()}</small>
                    </div>
                    <small class="text-muted">Tipo: ${notif.type}</small>
                </div>
            `
      )
      .join("");
  }
}

// ============================================================================
// 🎤 DEMONSTRAÇÃO 3: WEB SPEECH API
// ============================================================================

class Demo3_WebSpeechAPI {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isRecording = false;
    this.transcript = "";
    this.init();
  }

  init() {
    console.log("🎤 Demo 3: Web Speech API inicializada");
    this.checkSupport();
    this.setupSpeechRecognition();
    this.setupControls();
    this.loadVoices();
  }

  checkSupport() {
    const recognitionSupported =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    const synthesisSupported = "speechSynthesis" in window;

    const statusElement = document.getElementById("speech-status");
    if (statusElement) {
      statusElement.innerHTML = `
                <div>Reconhecimento: ${
                  recognitionSupported
                    ? '<span class="text-success">✅</span>'
                    : '<span class="text-danger">❌</span>'
                }</div>
                <div>Síntese: ${
                  synthesisSupported
                    ? '<span class="text-success">✅</span>'
                    : '<span class="text-danger">❌</span>'
                }</div>
            `;
    }

    return { recognitionSupported, synthesisSupported };
  }

  setupSpeechRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "pt-BR";

    this.recognition.onstart = () => {
      this.isRecording = true;
      this.updateRecordingStatus();
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      this.updateRecordingStatus();
    };

    this.recognition.onresult = (event) => {
      this.handleSpeechResult(event);
    };

    this.recognition.onerror = (event) => {
      console.error("Erro no reconhecimento:", event.error);
      this.showError("speech-result", `Erro: ${event.error}`);
    };
  }

  setupControls() {
    const btnStartRecording = document.getElementById("btn-start-recording");
    const btnStopRecording = document.getElementById("btn-stop-recording");
    const btnSpeakText = document.getElementById("btn-speak-text");
    const btnClearTranscript = document.getElementById("btn-clear-transcript");

    if (btnStartRecording) {
      btnStartRecording.addEventListener("click", () => this.startRecording());
    }

    if (btnStopRecording) {
      btnStopRecording.addEventListener("click", () => this.stopRecording());
    }

    if (btnSpeakText) {
      btnSpeakText.addEventListener("click", () => this.speakText());
    }

    if (btnClearTranscript) {
      btnClearTranscript.addEventListener("click", () =>
        this.clearTranscript()
      );
    }
  }

  startRecording() {
    if (!this.recognition) {
      alert("Reconhecimento de voz não suportado");
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
    }
  }

  stopRecording() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
    }
  }

  handleSpeechResult(event) {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    this.transcript += finalTranscript;
    this.updateTranscriptDisplay(interimTranscript);
  }

  updateTranscriptDisplay(interimText = "") {
    const resultElement = document.getElementById("speech-result");
    if (!resultElement) return;

    resultElement.innerHTML = `
            <div class="transcript-container">
                <h5>📝 Transcrição:</h5>
                <div class="transcript-final">${this.transcript}</div>
                ${
                  interimText
                    ? `<div class="transcript-interim text-muted">${interimText}</div>`
                    : ""
                }
            </div>
        `;
  }

  updateRecordingStatus() {
    const statusElement = document.getElementById("recording-status");
    if (statusElement) {
      statusElement.innerHTML = this.isRecording
        ? '<span class="text-danger">🔴 Gravando...</span>'
        : '<span class="text-muted">⏹️ Parado</span>';
    }
  }

  speakText() {
    const textInput = document.getElementById("text-to-speak");
    const voiceSelect = document.getElementById("voice-select");

    if (!textInput || !this.synthesis) return;

    const text = textInput.value.trim();
    if (!text) {
      alert("Digite um texto para falar");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    if (voiceSelect && voiceSelect.value) {
      const voices = this.synthesis.getVoices();
      utterance.voice = voices[voiceSelect.value];
    }

    utterance.rate = document.getElementById("speech-rate")?.value || 1;
    utterance.pitch = document.getElementById("speech-pitch")?.value || 1;
    utterance.volume = document.getElementById("speech-volume")?.value || 1;

    utterance.onstart = () => {
      this.updateSpeechStatus("🔊 Falando...");
    };

    utterance.onend = () => {
      this.updateSpeechStatus("✅ Concluído");
    };

    this.synthesis.speak(utterance);
  }

  loadVoices() {
    const voiceSelect = document.getElementById("voice-select");
    if (!voiceSelect || !this.synthesis) return;

    const updateVoices = () => {
      const voices = this.synthesis.getVoices();
      voiceSelect.innerHTML = voices
        .map(
          (voice, index) => `
                    <option value="${index}">
                        ${voice.name} (${voice.lang})
                    </option>
                `
        )
        .join("");
    };

    updateVoices();
    this.synthesis.onvoiceschanged = updateVoices;
  }

  updateSpeechStatus(status) {
    const statusElement = document.getElementById("speech-synthesis-status");
    if (statusElement) {
      statusElement.innerHTML = status;
      setTimeout(() => {
        statusElement.innerHTML = "⏹️ Pronto";
      }, 2000);
    }
  }

  clearTranscript() {
    this.transcript = "";
    this.updateTranscriptDisplay();
  }

  showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    ${message}
                </div>
            `;
    }
  }
}

// ============================================================================
// 📹 DEMONSTRAÇÃO 4: MEDIASTREAM API (CAMERA/MICROFONE)
// ============================================================================

class Demo4_MediaStreamAPI {
  constructor() {
    this.stream = null;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.init();
  }

  init() {
    console.log("📹 Demo 4: MediaStream API inicializada");
    this.checkSupport();
    this.setupControls();
  }

  checkSupport() {
    const supported =
      "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;
    const statusElement = document.getElementById("media-status");

    if (statusElement) {
      statusElement.innerHTML = supported
        ? `<span class="text-success">✅ MediaStream API suportada</span>`
        : `<span class="text-danger">❌ MediaStream API não suportada</span>`;
    }

    return supported;
  }

  setupControls() {
    const btnStartCamera = document.getElementById("btn-start-camera");
    const btnStopCamera = document.getElementById("btn-stop-camera");
    const btnTakePhoto = document.getElementById("btn-take-photo");
    const btnStartRecording = document.getElementById(
      "btn-start-video-recording"
    );
    const btnStopRecording = document.getElementById(
      "btn-stop-video-recording"
    );

    if (btnStartCamera) {
      btnStartCamera.addEventListener("click", () => this.startCamera());
    }

    if (btnStopCamera) {
      btnStopCamera.addEventListener("click", () => this.stopCamera());
    }

    if (btnTakePhoto) {
      btnTakePhoto.addEventListener("click", () => this.takePhoto());
    }

    if (btnStartRecording) {
      btnStartRecording.addEventListener("click", () => this.startRecording());
    }

    if (btnStopRecording) {
      btnStopRecording.addEventListener("click", () => this.stopRecording());
    }
  }

  async startCamera() {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: true,
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      const videoElement = document.getElementById("camera-video");
      if (videoElement) {
        videoElement.srcObject = this.stream;
      }

      this.updateCameraStatus("📹 Câmera ativa");
      this.enableCameraControls(true);
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      this.showError("camera-result", `Erro: ${error.message}`);
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;

      const videoElement = document.getElementById("camera-video");
      if (videoElement) {
        videoElement.srcObject = null;
      }

      this.updateCameraStatus("📷 Câmera parada");
      this.enableCameraControls(false);
    }
  }

  takePhoto() {
    if (!this.stream) {
      alert("Inicie a câmera primeiro");
      return;
    }

    const videoElement = document.getElementById("camera-video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    context.drawImage(videoElement, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    this.displayPhoto(imageData);
  }

  displayPhoto(imageData) {
    const photosContainer = document.getElementById("photos-container");
    if (!photosContainer) return;

    const photoElement = document.createElement("div");
    photoElement.className = "photo-item";
    photoElement.innerHTML = `
            <img src="${imageData}" alt="Foto capturada" class="captured-photo">
            <div class="photo-actions">
                <button onclick="demo4.downloadImage('${imageData}')" class="btn btn-sm btn-primary">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;

    photosContainer.insertBefore(photoElement, photosContainer.firstChild);
  }

  startRecording() {
    if (!this.stream) {
      alert("Inicie a câmera primeiro");
      return;
    }

    try {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.processRecording();
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.updateRecordingStatus("🔴 Gravando vídeo...");
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      this.showError("video-result", `Erro: ${error.message}`);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.updateRecordingStatus("⏹️ Gravação parada");
    }
  }

  processRecording() {
    const blob = new Blob(this.recordedChunks, { type: "video/webm" });
    const videoUrl = URL.createObjectURL(blob);

    this.displayRecording(videoUrl);
  }

  displayRecording(videoUrl) {
    const videosContainer = document.getElementById("videos-container");
    if (!videosContainer) return;

    const videoElement = document.createElement("div");
    videoElement.className = "video-item";
    videoElement.innerHTML = `
            <video controls class="recorded-video">
                <source src="${videoUrl}" type="video/webm">
            </video>
            <div class="video-actions">
                <button onclick="demo4.downloadVideo('${videoUrl}')" class="btn btn-sm btn-primary">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;

    videosContainer.insertBefore(videoElement, videosContainer.firstChild);
  }

  downloadImage(imageData) {
    const link = document.createElement("a");
    link.download = `foto-${Date.now()}.png`;
    link.href = imageData;
    link.click();
  }

  downloadVideo(videoUrl) {
    const link = document.createElement("a");
    link.download = `video-${Date.now()}.webm`;
    link.href = videoUrl;
    link.click();
  }

  updateCameraStatus(status) {
    const statusElement = document.getElementById("camera-status");
    if (statusElement) {
      statusElement.innerHTML = status;
    }
  }

  updateRecordingStatus(status) {
    const statusElement = document.getElementById("recording-status-video");
    if (statusElement) {
      statusElement.innerHTML = status;
    }
  }

  enableCameraControls(enabled) {
    const controls = ["btn-take-photo", "btn-start-video-recording"];
    controls.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.disabled = !enabled;
      }
    });
  }

  showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    ${message}
                </div>
            `;
    }
  }
}

// ============================================================================
// 👷 DEMONSTRAÇÃO 5: WEB WORKERS
// ============================================================================

class Demo5_WebWorkers {
  constructor() {
    this.workers = new Map();
    this.init();
  }

  init() {
    console.log("👷 Demo 5: Web Workers inicializada");
    this.checkSupport();
    this.setupControls();
    this.createWorkerCode();
  }

  checkSupport() {
    const supported = "Worker" in window;
    const statusElement = document.getElementById("worker-status");

    if (statusElement) {
      statusElement.innerHTML = supported
        ? `<span class="text-success">✅ Web Workers suportados</span>`
        : `<span class="text-danger">❌ Web Workers não suportados</span>`;
    }

    return supported;
  }

  setupControls() {
    const btnHeavyTask = document.getElementById("btn-heavy-task");
    const btnWorkerTask = document.getElementById("btn-worker-task");
    const btnMultipleWorkers = document.getElementById("btn-multiple-workers");
    const btnStopWorkers = document.getElementById("btn-stop-workers");

    if (btnHeavyTask) {
      btnHeavyTask.addEventListener("click", () =>
        this.runHeavyTaskMainThread()
      );
    }

    if (btnWorkerTask) {
      btnWorkerTask.addEventListener("click", () => this.runTaskInWorker());
    }

    if (btnMultipleWorkers) {
      btnMultipleWorkers.addEventListener("click", () =>
        this.runMultipleWorkers()
      );
    }

    if (btnStopWorkers) {
      btnStopWorkers.addEventListener("click", () => this.stopAllWorkers());
    }
  }

  createWorkerCode() {
    // Criar código do worker como string para criar Blob URL
    this.workerCode = `
            self.onmessage = function(e) {
                const { type, data } = e.data;
                
                switch(type) {
                    case 'fibonacci':
                        const result = fibonacci(data.n);
                        self.postMessage({
                            type: 'fibonacci-result',
                            result: result,
                            workerId: data.workerId
                        });
                        break;
                        
                    case 'prime-check':
                        const isPrime = checkPrime(data.number);
                        self.postMessage({
                            type: 'prime-result',
                            number: data.number,
                            isPrime: isPrime,
                            workerId: data.workerId
                        });
                        break;
                        
                    case 'heavy-calculation':
                        let sum = 0;
                        for(let i = 0; i < data.iterations; i++) {
                            sum += Math.sqrt(i);
                            if(i % 100000 === 0) {
                                self.postMessage({
                                    type: 'progress',
                                    progress: (i / data.iterations) * 100,
                                    workerId: data.workerId
                                });
                            }
                        }
                        
                        self.postMessage({
                            type: 'calculation-result',
                            result: sum,
                            workerId: data.workerId
                        });
                        break;
                }
            };
            
            function fibonacci(n) {
                if (n <= 1) return n;
                let a = 0, b = 1;
                for (let i = 2; i <= n; i++) {
                    let temp = a + b;
                    a = b;
                    b = temp;
                }
                return b;
            }
            
            function checkPrime(num) {
                if (num <= 1) return false;
                if (num <= 3) return true;
                if (num % 2 === 0 || num % 3 === 0) return false;
                
                for (let i = 5; i * i <= num; i += 6) {
                    if (num % i === 0 || num % (i + 2) === 0) return false;
                }
                return true;
            }
        `;
  }

  runHeavyTaskMainThread() {
    this.updateMainThreadStatus("🔄 Executando na thread principal...");

    const startTime = performance.now();
    let result = 0;

    // Simular tarefa pesada
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    this.updateMainThreadStatus(`✅ Concluído em ${duration.toFixed(2)}ms`);
    this.displayResult("main-thread-result", `Resultado: ${result.toFixed(2)}`);
  }

  runTaskInWorker() {
    if (!this.checkSupport()) return;

    const workerId = "single-worker";
    this.createWorker(workerId);

    this.updateWorkerStatus("🔄 Executando no Web Worker...");

    const worker = this.workers.get(workerId);
    worker.postMessage({
      type: "heavy-calculation",
      data: {
        iterations: 1000000,
        workerId: workerId,
      },
    });
  }

  runMultipleWorkers() {
    if (!this.checkSupport()) return;

    const workerCount = 4;
    this.updateMultipleWorkersStatus("🔄 Iniciando múltiplos workers...");

    for (let i = 0; i < workerCount; i++) {
      const workerId = `worker-${i}`;
      this.createWorker(workerId);

      const worker = this.workers.get(workerId);
      worker.postMessage({
        type: "fibonacci",
        data: {
          n: 40 + i,
          workerId: workerId,
        },
      });
    }
  }

  createWorker(workerId) {
    if (this.workers.has(workerId)) {
      this.workers.get(workerId).terminate();
    }

    const blob = new Blob([this.workerCode], {
      type: "application/javascript",
    });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    worker.onmessage = (e) => this.handleWorkerMessage(e);
    worker.onerror = (error) => {
      console.error(`Erro no worker ${workerId}:`, error);
    };

    this.workers.set(workerId, worker);
    URL.revokeObjectURL(workerUrl);
  }

  handleWorkerMessage(e) {
    const { type, workerId } = e.data;

    switch (type) {
      case "fibonacci-result":
        this.displayWorkerResult(workerId, `Fibonacci: ${e.data.result}`);
        break;

      case "prime-result":
        this.displayWorkerResult(
          workerId,
          `${e.data.number} é ${e.data.isPrime ? "primo" : "não primo"}`
        );
        break;

      case "calculation-result":
        this.updateWorkerStatus(`✅ Worker concluído`);
        this.displayResult(
          "worker-result",
          `Resultado: ${e.data.result.toFixed(2)}`
        );
        break;

      case "progress":
        this.updateWorkerProgress(e.data.progress);
        break;
    }
  }

  displayWorkerResult(workerId, result) {
    const resultsContainer = document.getElementById(
      "multiple-workers-results"
    );
    if (!resultsContainer) return;

    const resultElement = document.createElement("div");
    resultElement.className = "worker-result-item";
    resultElement.innerHTML = `
            <strong>${workerId}:</strong> ${result}
        `;

    resultsContainer.appendChild(resultElement);
  }

  stopAllWorkers() {
    this.workers.forEach((worker, workerId) => {
      worker.terminate();
    });

    this.workers.clear();
    this.updateWorkerStatus("⏹️ Todos os workers parados");
    this.updateMultipleWorkersStatus("⏹️ Workers parados");

    // Limpar resultados
    const resultsContainer = document.getElementById(
      "multiple-workers-results"
    );
    if (resultsContainer) {
      resultsContainer.innerHTML = "";
    }
  }

  updateMainThreadStatus(status) {
    const element = document.getElementById("main-thread-status");
    if (element) element.innerHTML = status;
  }

  updateWorkerStatus(status) {
    const element = document.getElementById("worker-status-single");
    if (element) element.innerHTML = status;
  }

  updateMultipleWorkersStatus(status) {
    const element = document.getElementById("multiple-workers-status");
    if (element) element.innerHTML = status;
  }

  updateWorkerProgress(progress) {
    const progressBar = document.getElementById("worker-progress");
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      progressBar.textContent = `${progress.toFixed(1)}%`;
    }
  }

  displayResult(elementId, result) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<div class="alert alert-success">${result}</div>`;
    }
  }
}

// ============================================================================
// ⚙️ DEMONSTRAÇÃO 6: SERVICE WORKERS (BÁSICO)
// ============================================================================

class Demo6_ServiceWorkers {
  constructor() {
    this.registration = null;
    this.init();
  }

  init() {
    console.log("⚙️ Demo 6: Service Workers inicializada");
    this.checkSupport();
    this.setupControls();
  }

  checkSupport() {
    const supported = "serviceWorker" in navigator;
    const statusElement = document.getElementById("sw-status");

    if (statusElement) {
      statusElement.innerHTML = supported
        ? `<span class="text-success">✅ Service Workers suportados</span>`
        : `<span class="text-danger">❌ Service Workers não suportados</span>`;
    }

    return supported;
  }

  setupControls() {
    const btnRegister = document.getElementById("btn-register-sw");
    const btnUnregister = document.getElementById("btn-unregister-sw");
    const btnTestCache = document.getElementById("btn-test-cache");
    const btnClearCache = document.getElementById("btn-clear-cache");

    if (btnRegister) {
      btnRegister.addEventListener("click", () => this.registerServiceWorker());
    }

    if (btnUnregister) {
      btnUnregister.addEventListener("click", () =>
        this.unregisterServiceWorker()
      );
    }

    if (btnTestCache) {
      btnTestCache.addEventListener("click", () => this.testCache());
    }

    if (btnClearCache) {
      btnClearCache.addEventListener("click", () => this.clearCache());
    }

    // Verificar se já existe um service worker registrado
    this.checkExistingRegistration();
  }

  async registerServiceWorker() {
    if (!this.checkSupport()) return;

    try {
      // Como não temos um arquivo SW real, vamos criar um placeholder
      this.createServiceWorkerCode();

      this.updateSWStatus("🔄 Registrando Service Worker...");

      // Simular registro (em produção seria um arquivo separado)
      this.updateSWStatus("✅ Service Worker registrado (simulado)");
      this.displaySWInfo("Service Worker ativo (modo demonstração)");
    } catch (error) {
      console.error("Erro ao registrar Service Worker:", error);
      this.updateSWStatus("❌ Erro no registro");
    }
  }

  createServiceWorkerCode() {
    // Código do Service Worker como string (para demonstração)
    const swCode = `
            const CACHE_NAME = 'aula-9-cache-v1';
            const urlsToCache = [
                '/',
                '/styles.css',
                '/script.js'
            ];

            self.addEventListener('install', event => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then(cache => cache.addAll(urlsToCache))
                );
            });

            self.addEventListener('fetch', event => {
                event.respondWith(
                    caches.match(event.request)
                        .then(response => {
                            return response || fetch(event.request);
                        })
                );
            });
        `;

    return swCode;
  }

  async checkExistingRegistration() {
    if (!this.checkSupport()) return;

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length > 0) {
        this.registration = registrations[0];
        this.updateSWStatus("✅ Service Worker já registrado");
        this.displaySWInfo(`Escopo: ${this.registration.scope}`);
      }
    } catch (error) {
      console.error("Erro ao verificar registros:", error);
    }
  }

  async unregisterServiceWorker() {
    if (!this.registration) {
      alert("Nenhum Service Worker registrado");
      return;
    }

    try {
      await this.registration.unregister();
      this.registration = null;
      this.updateSWStatus("🗑️ Service Worker removido");
      this.clearSWInfo();
    } catch (error) {
      console.error("Erro ao remover Service Worker:", error);
    }
  }

  async testCache() {
    try {
      // Simular teste de cache
      this.updateCacheStatus("🔄 Testando cache...");

      // Verificar caches disponíveis
      const cacheNames = await caches.keys();

      if (cacheNames.length > 0) {
        this.updateCacheStatus(
          `✅ ${cacheNames.length} cache(s) encontrado(s)`
        );
        this.displayCacheInfo(cacheNames);
      } else {
        this.updateCacheStatus("⚠️ Nenhum cache encontrado");
      }
    } catch (error) {
      console.error("Erro ao testar cache:", error);
      this.updateCacheStatus("❌ Erro no teste");
    }
  }

  async clearCache() {
    try {
      this.updateCacheStatus("🔄 Limpando cache...");

      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );

      this.updateCacheStatus("🗑️ Cache limpo");
      this.clearCacheInfo();
    } catch (error) {
      console.error("Erro ao limpar cache:", error);
      this.updateCacheStatus("❌ Erro ao limpar");
    }
  }

  updateSWStatus(status) {
    const element = document.getElementById("sw-registration-status");
    if (element) element.innerHTML = status;
  }

  updateCacheStatus(status) {
    const element = document.getElementById("cache-status");
    if (element) element.innerHTML = status;
  }

  displaySWInfo(info) {
    const element = document.getElementById("sw-info");
    if (element) {
      element.innerHTML = `<div class="alert alert-info">${info}</div>`;
    }
  }

  displayCacheInfo(cacheNames) {
    const element = document.getElementById("cache-info");
    if (element) {
      element.innerHTML = `
                <div class="alert alert-info">
                    <strong>Caches encontrados:</strong>
                    <ul class="mb-0 mt-2">
                        ${cacheNames.map((name) => `<li>${name}</li>`).join("")}
                    </ul>
                </div>
            `;
    }
  }

  clearSWInfo() {
    const element = document.getElementById("sw-info");
    if (element) element.innerHTML = "";
  }

  clearCacheInfo() {
    const element = document.getElementById("cache-info");
    if (element) element.innerHTML = "";
  }
}

// ============================================================================
// INICIALIZAÇÃO GLOBAL
// ============================================================================

// Instâncias globais das demonstrações
let demo1, demo2, demo3, demo4, demo5, demo6;

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  console.log("🌐 Iniciando Aula 9: Web APIs Modernas");

  try {
    demo1 = new Demo1_GeolocationAPI();
    demo2 = new Demo2_NotificationAPI();
    demo3 = new Demo3_WebSpeechAPI();
    demo4 = new Demo4_MediaStreamAPI();
    demo5 = new Demo5_WebWorkers();
    demo6 = new Demo6_ServiceWorkers();

    console.log("✅ Todas as demonstrações inicializadas!");
  } catch (error) {
    console.error("❌ Erro na inicialização:", error);
  }
});

// Limpeza ao fechar a página
window.addEventListener("beforeunload", function () {
  // Parar streams de mídia
  if (demo4 && demo4.stream) {
    demo4.stopCamera();
  }

  // Parar workers
  if (demo5) {
    demo5.stopAllWorkers();
  }

  // Parar geolocation watching
  if (demo1) {
    demo1.stopWatching();
  }
});
