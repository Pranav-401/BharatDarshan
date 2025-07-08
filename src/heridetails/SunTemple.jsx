import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Cloud,
  Sun,
  CloudRain,
  ArrowLeft,
  MapPin,
  Play,
  Music,
  BookOpen,
  History,
  Star,
  Clock,
  Camera,
  Heart,
  Crown,
  Sparkles,
  Eye,
  Volume2,
  Share2,
  Download,
  Calendar,
  Users,
  Award,
} from "lucide-react";

const SunTemple = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "/images/sunTemple01.jpg",
      title: "Sun Temple",
    },
    {
      url: "/images/sunTemple02.jpg",
      title: "Sun Temple",
    },
    {
      url: "/images/sunTemple03.jpg",
      title: "Sun Temple",
    },
  ];

  const amazingFacts = [
    {
      icon: Sun,
      title: "Solar Architecture",
      fact: "The Sun Temple was designed as a colossal chariot of the Sun God, with 12 pairs of intricately carved wheels and seven horses.",
      color: "text-yellow-500",
    },
    {
      icon: Crown,
      title: "Royal Patronage",
      fact: "Built by King Narasimhadeva I of the Eastern Ganga Dynasty around 1250 CE, it showcases the peak of Kalinga architecture.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Astronomical Precision",
      fact: "The temple's wheels function as sundials, accurately telling time by the shadow cast by the sun.",
      color: "text-blue-500",
    },
    {
      icon: Star,
      title: "Artistic Mastery",
      fact: "The temple's intricate carvings depict daily life, mythology, and celestial beings, reflecting Odisha's rich cultural heritage.",
      color: "text-red-500",
    },
    {
      icon: Award,
      title: "UNESCO Wonder",
      fact: "Designated as a UNESCO World Heritage Site in 1984 for its outstanding universal value and architectural grandeur.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "The Rise of Kalinga Architecture",
        description:
          "Explore the historical context and architectural brilliance of the Sun Temple",
        duration: "14:20",
        views: "1.9M",
        rating: 4.8,
        category: "History",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Narasimhadeva I's Legacy",
        description:
          "Learn about the king who commissioned this architectural marvel",
        duration: "12:30",
        views: "1.5M",
        rating: 4.7,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Construction Techniques of Konark",
        description:
          "Discover the innovative methods used to build this chariot-shaped temple",
        duration: "16:45",
        views: "2.3M",
        rating: 4.9,
        category: "Architecture",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Odia Culture and Traditions",
        description:
          "Experience the vibrant cultural heritage of Odisha surrounding the temple",
        duration: "13:15",
        views: "1.2M",
        rating: 4.6,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Konark Dance Festival",
        description:
          "Witness the annual celebration of classical dance forms at the Sun Temple",
        duration: "15:50",
        views: "980K",
        rating: 4.8,
        category: "Festivals",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Artisans of Odisha",
        description:
          "Meet the craftsmen preserving the temple's artistic traditions",
        duration: "11:20",
        views: "870K",
        rating: 4.7,
        category: "Craftsmanship",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Odissi Music and Dance",
        description:
          "Soulful melodies and rhythms inspired by the temple's divine aura",
        duration: "22:10",
        views: "2.5M",
        rating: 4.9,
        category: "Odissi Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Devotional Songs of Konark",
        description:
          "Traditional bhajans dedicated to the Sun God and temple's legacy",
        duration: "18:40",
        views: "1.7M",
        rating: 4.8,
        category: "Devotional",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Melodies of Odisha",
        description:
          "Celebrate the region's folk music inspired by Konark's grandeur",
        duration: "17:25",
        views: "1.3M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of the Sun God",
        description:
          "Unravel the legends surrounding Surya, the deity of the Sun Temple",
        duration: "15:10",
        views: "2.1M",
        rating: 4.8,
        category: "Mythology",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "The Chariot of Konark",
        description:
          "Explore the symbolic meaning behind the temple's chariot design",
        duration: "11:45",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Significance of Konark",
        description:
          "Understand the temple's role in Hindu cosmology and worship",
        duration: "19:30",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Tour of Sun Temple",
        description:
          "Immerse yourself in a virtual reality tour of the temple's intricate details",
        duration: "26:20",
        views: "3.8M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Aerial Views of Konark",
        description:
          "Stunning drone footage showcasing the temple's grandeur from above",
        duration: "7:50",
        views: "2.9M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Konark's Glory",
        description:
          "Watch the temple's transformation under changing light conditions",
        duration: "5:15",
        views: "4.5M",
        rating: 4.9,
        category: "Time-lapse",
      },
    ],
  };

  const categoryIcons = {
    historical: History,
    cultural: BookOpen,
    music: Music,
    mythology: Eye,
    virtual: Camera,
  };

  const categoryLabels = {
    historical: "Historical Tales",
    cultural: "Cultural Heritage",
    music: "Sacred Music",
    mythology: "Legends & Myths",
    virtual: "Virtual Experience",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    setVisitorsCount(12456);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % amazingFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "dawn";
      if (hour >= 12 && hour < 17) return "day";
      if (hour >= 17 && hour < 20) return "sunset";
      return "night";
    };

    setTimeOfDay(getTimeOfDay());
    const timeInterval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
          console.error("OpenWeather API key not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Konark,IN&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const EnhancedVideoCard = ({ video, index }) => (
    <div
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setHoveredVideo(index)}
      onMouseLeave={() => setHoveredVideo(null)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center relative">
          <iframe
            width="100%"
            height="100%"
            src={video.id}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="transition-transform duration-300 group-hover:scale-105"
          ></iframe>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {video.duration}
        </div>
        <div
          className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
            hoveredVideo === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {video.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {video.rating}
            </span>
          </div>
          <button className="text-orange-600 hover:text-orange-800 font-medium">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <button
        onClick={handleBackClick}
        className="fixed top-6 left-6 z-50 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200 hover:scale-110"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
      </button>
      <div className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MapPin className="w-5 h-5 text-red-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-800 block">
              Konark, Odisha
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors today
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${carouselImages[currentImageIndex].url}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        </div>
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 hover:scale-110"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 hover:scale-110"
        >
          <ChevronRight className="w-10 h-10" />
        </button>
        <div className="absolute top-32 left-12 z-20 max-w-2xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-8xl font-bold text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text">
              {carouselImages[currentImageIndex].title}
            </h1>
            <p className="text-2xl text-white/90 mb-6 drop-shadow-lg">
              {carouselImages[currentImageIndex].description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-12 h-4 bg-white shadow-2xl"
                  : "w-4 h-4 bg-white/50 hover:bg-white/75"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50">
        <div className="flex">
          <div className="flex-1 p-16">
            <div className="max-w-4xl">
              <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-12 leading-tight">
                A Chariot to the Sun God
                <br />
                <span className="text-4xl">and Kalinga Architecture</span>
              </h2>
              <div className="prose prose-xl text-gray-700 space-y-8 mb-12">
                <p className="text-2xl leading-relaxed">
                  The Sun Temple at Konark, Odisha, is a 13th-century
                  masterpiece dedicated to the Sun God, Surya. Designed as a
                  massive chariot, this UNESCO World Heritage Site exemplifies
                  the grandeur of Kalinga architecture under the Eastern Ganga
                  Dynasty.
                </p>
                <p className="text-xl leading-relaxed text-gray-600">
                  The temple's intricate stone carvings, colossal wheels, and
                  celestial motifs capture the essence of Odisha's cultural and
                  artistic heritage. Despite partial ruins, its magnificence
                  continues to draw visitors from across the globe.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <h3 className="font-bold text-xl text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-orange-600 mb-1">
                    ~1250 CE
                  </p>
                  <p className="text-sm text-gray-600">Eastern Ganga Dynasty</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <h3 className="font-bold text-xl text-gray-800">
                      Artisans
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-1">
                    Thousands
                  </p>
                  <p className="text-sm text-gray-600">Skilled craftsmen</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                    <h3 className="font-bold text-xl text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-lg font-bold text-green-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-sm text-gray-600">Since 1984</p>
                </div>
              </div>
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-4xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Volume2 className="w-4 h-4" />
                    <span>Use headphones for best experience</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-8">
                  {Object.keys(videoContent).map((category) => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveVideoCategory(category)}
                        className={`group flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-500 hover:scale-105 ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-2xl"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                            activeVideoCategory === category
                              ? "text-white"
                              : "text-orange-500"
                          }`}
                        />
                        <span className="font-medium">
                          {categoryLabels[category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videoContent[activeVideoCategory].map((video, index) => (
                    <EnhancedVideoCard
                      key={`${activeVideoCategory}-${index}`}
                      video={video}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-12">
                <h3 className="text-4xl font-bold text-gray-800 mb-8">
                  Historical Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                  {[
                    {
                      year: "1238",
                      event: "King Narasimhadeva I ascends the throne",
                      color: "red",
                    },
                    {
                      year: "1250",
                      event: "Construction of Sun Temple begins",
                      color: "blue",
                    },
                    {
                      year: "1260",
                      event: "Main temple structure completed",
                      color: "green",
                    },
                    {
                      year: "1500s",
                      event: "Temple falls into disuse after invasions",
                      color: "purple",
                    },
                    {
                      year: "1903",
                      event: "Restoration efforts begin by ASI",
                      color: "yellow",
                    },
                    {
                      year: "1984",
                      event: "Designated UNESCO World Heritage Site",
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-8 group"
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-4 border-white shadow-lg bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-1 group-hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-2xl font-bold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-gray-700 text-lg">
                            {item.event}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 bg-gradient-to-br from-gray-50 to-white border-l border-gray-200 p-8 sticky top-0 h-screen overflow-y-auto">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-500" />
                Location & Directions
              </h3>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="font-semibold text-gray-800 text-sm">
                    Konark, Puri, Odisha 752111
                  </p>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.614574811148!2d86.09111791449873!3d19.887582986627237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7b9f4e4e4e4f%3A0x8e4b4f4b4e4e4e4e!2sSun%20Temple%2C%20Konark!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sun Temple Location"
                    className="rounded-lg"
                  ></iframe>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">
                      Interactive Map
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">Distance from</p>
                    <p className="font-bold text-orange-600">
                      Bhubaneswar: 65km
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">Puri</p>
                    <p className="font-bold text-orange-600">35km away</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                    🚗 Getting There
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Take NH316 from Bhubaneswar for a scenic 1.5-hour drive
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-blue-500" />
                Current Weather in Konark
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : weather ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getWeatherIcon(weather.weather?.[0]?.main)}
                      <span className="text-3xl font-bold text-gray-800">
                        {Math.round(weather.main?.temp)}°C
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 capitalize">
                        {weather.weather?.[0]?.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Feels like {Math.round(weather.main?.feels_like)}°C
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-600">Humidity</p>
                      <p className="font-bold text-blue-600">
                        {weather.main?.humidity}%
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-600">Visibility</p>
                      <p className="font-bold text-blue-600">
                        {weather.visibility
                          ? `${weather.visibility / 1000}km`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-3 border border-orange-200">
                    <p className="text-sm font-medium text-orange-800">
                      Best photography time
                    </p>
                    <p className="text-xs text-orange-600">
                      Sunrise: 5:30-6:30 AM for dramatic lighting
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Weather data unavailable</p>
              )}
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-500" />
                Visit Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-gray-600">Today's Date</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate()}
                  </span>
                </div>
                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-green-800">
                    Opening Hours
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Daily</span>
                      <span className="font-medium">6:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-green-800">Entry Fees</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Indian Citizens</span>
                      <span className="font-medium">₹40</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Tourists</span>
                      <span className="font-medium">₹600</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs font-medium text-orange-800">
                    💡 Pro Tip
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Visit during the Konark Dance Festival in December for a
                    cultural treat!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-500" />
                Did You Know?
              </h3>
              <div className="space-y-4">
                {amazingFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg p-4 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        index === currentFact
                          ? "ring-2 ring-orange-200 shadow-md"
                          : ""
                      }`}
                      onClick={() => setCurrentFact(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-100 to-yellow-100">
                          <IconComponent className={`w-4 h-4 ${fact.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">
                            {fact.title}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {fact.fact}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunTemple;
