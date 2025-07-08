import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Square,
  Play,
  Pause,
  Volume2,
  Languages,
  Download,
  Trash2,
  Upload,
  Sparkles,
  Zap,
  VolumeX,
  FileAudio,
  Headphones,
  MessageCircle,
  Globe,
  Star,
  Crown,
  Gem,
} from "lucide-react";

const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
      activeTab === id
        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
        : "bg-white/50 text-gray-700 hover:bg-white/70 border border-white/30"
    }`}
  >
    <Icon size={16} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const MultilingualAudioApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en-US");
  const [targetLanguage, setTargetLanguage] = useState("es-ES");
  const [activeTab, setActiveTab] = useState("text-to-speech");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const chunksRef = useRef([]);
  const audioUrlRef = useRef(null);
  const speechUtteranceRef = useRef(null);

  // Embedded GROQ API key
  const apiKey =
   import.meta.env.VITE_XAI_API_KEY;

  const languages = [
    { code: "en-US", name: "English (US)", flag: "🇺🇸" },
    { code: "es-ES", name: "Spanish (Spain)", flag: "🇪🇸" },
    { code: "fr-FR", name: "French (France)", flag: "🇫🇷" },
    { code: "de-DE", name: "German (Germany)", flag: "🇩🇪" },
    { code: "it-IT", name: "Italian (Italy)", flag: "🇮🇹" },
    { code: "pt-BR", name: "Portuguese (Brazil)", flag: "🇧🇷" },
    { code: "zh-CN", name: "Chinese (Mandarin)", flag: "🇨🇳" },
    { code: "ja-JP", name: "Japanese (Japan)", flag: "🇯🇵" },
    { code: "ko-KR", name: "Korean (South Korea)", flag: "🇰🇷" },
    { code: "ar-SA", name: "Arabic (Saudi Arabia)", flag: "🇸🇦" },
    { code: "hi-IN", name: "Hindi (India)", flag: "🇮🇳" },
    { code: "ru-RU", name: "Russian (Russia)", flag: "🇷🇺" },
  ];

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audiUrlRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const translateWithGroq = async (text, targetLang) => {
    try {
      const endpoint = "https://api.groq.com/openai/v1/chat/completions";

      const languageMap = {
        "en-US": "English",
        "es-ES": "Spanish",
        "fr-FR": "French",
        "de-DE": "German",
        "it-IT": "Italian",
        "pt-BR": "Portuguese",
        "zh-CN": "Chinese",
        "ja-JP": "Japanese",
        "ko-KR": "Korean",
        "ar-SA": "Arabic",
        "hi-IN": "Hindi",
        "ru-RU": "Russian",
      };

      const targetLanguageName = languageMap[targetLang] || targetLang;
      const prompt = `Translate the following text to ${targetLanguageName}. Only return the translation, no additional text: ${text}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are a professional translator. Return only the translation without any additional text or explanations.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 1000,
          temperature: 0.1,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message ||
            `Translation failed: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      return data.choices[0].message.content.trim();
    } catch (err) {
      console.error("Translation error:", err);
      setError(err.message || "Translation failed.");
      throw err;
    }
  };

  const handleTextToSpeech = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to convert to speech.");
      return;
    }

    if (!voicesLoaded) {
      setError("Speech voices are still loading. Please wait a moment.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      speechSynthesis.cancel();

      let textToSpeak = inputText;

      if (sourceLanguage !== targetLanguage) {
        textToSpeak = await translateWithGroq(inputText, targetLanguage);
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = targetLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) =>
        v.lang
          .toLowerCase()
          .startsWith(targetLanguage.toLowerCase().split("-")[0])
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsProcessing(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setError(`Speech synthesis error: ${e.error}`);
        setIsPlaying(false);
        setIsProcessing(false);
      };

      speechUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Text to speech error:", err);
      setError(err.message || "Text to speech failed.");
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    setError("");
    setTranscribedText("");
    setAudioBlob(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/wav";

      const recorder = new MediaRecorder(stream, {
        mimeType: mimeType,
      });

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        await handleSpeechRecognition(blob);
      };

      recorder.onerror = (e) => {
        setError(`Recording error: ${e.error}`);
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start(1000);
      setIsRecording(true);
    } catch (err) {
      console.error("Recording start error:", err);
      let errorMessage = "Failed to start recording.";

      if (err.name === "NotAllowedError") {
        errorMessage =
          "Microphone access denied. Please allow microphone access and try again.";
      } else if (err.name === "NotFoundError") {
        errorMessage = "No microphone found. Please check your audio devices.";
      } else if (err.name === "NotReadableError") {
        errorMessage = "Microphone is being used by another application.";
      }

      setError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSpeechRecognition = async (blob) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", blob, "audio.webm");
      formData.append("model", "whisper-large-v3");
      formData.append("language", sourceLanguage.split("-")[0]);
      formData.append("response_format", "json");

      const res = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message ||
            `Transcription failed: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();

      if (!data.text || data.text.trim() === "") {
        throw new Error(
          "No speech detected in the audio. Please try recording again."
        );
      }

      let finalText = data.text;

      if (sourceLanguage !== targetLanguage) {
        finalText = await translateWithGroq(data.text, targetLanguage);
      }

      setTranscribedText(finalText);
    } catch (err) {
      console.error("Speech recognition error:", err);
      setError(err.message || "Speech recognition failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }

      const url = URL.createObjectURL(audioBlob);
      audioUrlRef.current = url;
      audioRef.current.src = url;

      audioRef.current.play().catch((err) => {
        setError("Failed to play audio: " + err.message);
      });

      setIsPlaying(true);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        audioUrlRef.current = null;
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("audio/")) {
        setAudioBlob(file);
        setTranscribedText("");
        setError("");
        handleSpeechRecognition(file);
      } else {
        setError("Please select a valid audio file.");
      }
    }
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `recorded-audio-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const clearAudio = () => {
    setAudioBlob(null);
    setTranscribedText("");
    setError("");
    if (audioRef.current) {
      audioRef.current.src = "";
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleTextareaChange = (e) => {
    setInputText(e.target.value);
    setError("");
  };

  const handlePlayTranslation = async () => {
    if (!transcribedText.trim()) {
      setError("No translated text to play.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(transcribedText);
      utterance.lang = targetLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) =>
        v.lang
          .toLowerCase()
          .startsWith(targetLanguage.toLowerCase().split("-")[0])
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsProcessing(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        setError(`Speech synthesis error: ${e.error}`);
        setIsPlaying(false);
        setIsProcessing(false);
      };

      speechUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Translation playback error:", err);
      setError(err.message || "Failed to play translation.");
      setIsProcessing(false);
    }
  };

  const getLanguageByCode = (code) => {
    return languages.find((lang) => lang.code === code) || languages[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">🗣 Language Translator</h1>
              <p className="text-white/90 text-sm">
                Speak in different tongues, understand all languages
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl relative">
          <div className="flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/30">
        <TabButton
          id="text-to-speech"
          label="Text to Speech"
          icon={Volume2}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          id="speech-to-text"
          label="Speech to Text"
          icon={Mic}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          id="audio-to-audio"
          label="Audio Translation"
          icon={Headphones}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Language Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Language
          </label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full p-3 bg-white/70 border border-white/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-3 bg-white/70 border border-white/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl border border-white/50 p-4 sm:p-6">
        {activeTab === "text-to-speech" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to convert to speech
              </label>
              <textarea
                value={inputText}
                onChange={handleTextareaChange}
                placeholder="Type your message here..."
                className="w-full p-3 bg-white/70 border border-white/50 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none text-sm"
                rows={4}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleTextToSpeech}
                disabled={isProcessing || !voicesLoaded || !inputText.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                  isProcessing || !voicesLoaded || !inputText.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm">Processing...</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    <span className="text-sm">Speak</span>
                  </>
                )}
              </button>
              {isPlaying && (
                <button
                  onClick={stopSpeech}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <VolumeX size={16} />
                  <span className="text-sm">Stop</span>
                </button>
              )}
            </div>
            {!voicesLoaded && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                Loading speech voices...
              </div>
            )}
          </div>
        )}

        {activeTab === "speech-to-text" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transform hover:scale-105"
                  }`}
                >
                  <Mic size={16} />
                  <span className="text-sm">Start Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg animate-pulse font-medium"
                >
                  <Square size={16} />
                  <span className="text-sm">Stop Recording</span>
                </button>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or upload an audio file
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center gap-2 p-3 bg-white/70 border border-white/50 rounded-lg hover:bg-white/80 transition-colors">
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Click to upload audio file
                  </span>
                </div>
              </div>
            </div>

            {audioBlob && (
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileAudio className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Audio Controls
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={playAudio}
                    disabled={isPlaying}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-white text-sm transition-all duration-300 ${
                      isPlaying
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 transform hover:scale-105"
                    }`}
                  >
                    <Play size={14} />
                    Play
                  </button>
                  <button
                    onClick={pauseAudio}
                    disabled={!isPlaying}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-white text-sm transition-all duration-300 ${
                      !isPlaying
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105"
                    }`}
                  >
                    <Pause size={14} />
                    Pause
                  </button>
                  <button
                    onClick={downloadAudio}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-all duration-300 transform hover:scale-105"
                  >
                    <Download size={14} />
                    Download
                  </button>
                  <button
                    onClick={clearAudio}
                    className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-all duration-300 transform hover:scale-105"
                  >
                    <Trash2 size={14} />
                    Clear
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcribed & Translated Text
              </label>
              <div className="bg-white/50 border border-white/30 p-4 rounded-lg min-h-[80px] max-h-[200px] overflow-y-auto">
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                    <span className="text-sm">Processing audio...</span>
                  </div>
                ) : transcribedText ? (
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {transcribedText}
                  </p>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    Transcribed text will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "audio-to-audio" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">
                  Audio Translation
                </h3>
              </div>
              <p className="text-blue-800 text-sm">
                Record or upload audio in the source language, and it will be
                automatically transcribed and translated to the target language.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transform hover:scale-105"
                  }`}
                >
                  <Mic size={16} />
                  <span className="text-sm">Start Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg animate-pulse font-medium"
                >
                  <Square size={16} />
                  <span className="text-sm">Stop Recording</span>
                </button>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or upload an audio file
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center gap-2 p-3 bg-white/70 border border-white/50 rounded-lg hover:bg-white/80 transition-colors">
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Click to upload audio file
                  </span>
                </div>
              </div>
            </div>

            {audioBlob && (
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileAudio className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Audio Controls
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={playAudio}
                    disabled={isPlaying}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-white text-sm transition-all duration-300 ${
                      isPlaying
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 transform hover:scale-105"
                    }`}
                  >
                    <Play size={14} />
                    Play
                  </button>
                  <button
                    onClick={pauseAudio}
                    disabled={!isPlaying}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-white text-sm transition-all duration-aw-300 ${
                      !isPlaying
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105"
                    }`}
                  >
                    <Pause size={14} />
                    Pause
                  </button>
                  <button
                    onClick={downloadAudio}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-all duration-300 transform hover:scale-105"
                  >
                    <Download size={14} />
                    Download
                  </button>
                  <button
                    onClick={clearAudio}
                    className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-all duration-300 transform hover:scale-105"
                  >
                    <Trash2 size={14} />
                    Clear
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcribed & Translated Text
              </label>
              <div className="bg-white/50 border border-white/30 p-4 rounded-lg min-h-[80px] max-h-[200px] overflow-y-auto">
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                    <span className="text-sm">Processing audio...</span>
                  </div>
                ) : transcribedText ? (
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {transcribedText}
                  </p>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    Transcribed text will appear here...
                  </p>
                )}
              </div>
            </div>

            {transcribedText && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePlayTranslation}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transform hover:scale-105"
                  }`}
                >
                  <Volume2 size={16} />
                  <span className="text-sm">Play Translation</span>
                </button>
                {isPlaying && (
                  <button
                    onClick={stopSpeech}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <VolumeX size={16} />
                    <span className="text-sm">Stop</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Language Information */}
      <div className="bg-white/50 backdrop-blur-md rounded-xl p-4 border border-white/30">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Language Selection</h3>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">From:</span>
            <span className="font-medium text-gray-800">
              {getLanguageByCode(sourceLanguage).flag}{" "}
              {getLanguageByCode(sourceLanguage).name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">To:</span>
            <span className="font-medium text-gray-800">
              {getLanguageByCode(targetLanguage).flag}{" "}
              {getLanguageByCode(targetLanguage).name}
            </span>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} style={{ display: "none" }} />

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <div className="flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" />
          <span>Powered by GROQ API & Web Speech API</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default MultilingualAudioApp;
