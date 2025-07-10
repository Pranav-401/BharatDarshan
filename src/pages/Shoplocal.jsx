import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Star,
  Filter,
  Plus,
  X,
  ShoppingCart,
  User,
  MapPin,
  Eye,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

const ShopLocal = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showVendorStory, setShowVendorStory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Placeholder for video background; replace with actual video URLs in production
  const videos = ["/videos/trad.mp4", "/videos/trad.mp4"];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle video switching
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    "All",
    "Rajasthani",
    "Assamese",
    "Bengali",
    "Gujarati",
    "Punjabi",
    "Tamil",
    "Kerala",
  ];
  const categories = [
    "All",
    "Ethnic Clothes",
    "Handicrafts",
    "Fort Souvenirs",
    "Jewelry",
    "Home Decor",
  ];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Rajasthani Bandhani Saree",
      price: "₹3,500",
      image:
        "https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=300&h=300&fit=crop",
      region: "Rajasthani",
      category: "Ethnic Clothes",
      rating: 4.8,
      vendor: "Meera Crafts",
      vendorStory:
        "Meera has been weaving traditional Bandhani patterns for over 20 years in Jodhpur, keeping alive the ancient tie-dye techniques passed down through generations.",
      description:
        "Authentic hand-tied Bandhani saree with traditional mirror work",
    },
    {
      id: 2,
      name: "Assamese Gamosa",
      price: "₹450",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop",
      region: "Assamese",
      category: "Ethnic Clothes",
      rating: 4.6,
      vendor: "Brahmaputra Weavers",
      vendorStory:
        "A cooperative of 50+ women weavers from rural Assam, preserving the traditional art of Gamosa weaving while supporting their families.",
      description:
        "Traditional white cotton towel with red border, sacred in Assamese culture",
    },
    {
      id: 3,
      name: "Jaipur Blue Pottery Vase",
      price: "₹1,200",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      region: "Rajasthani",
      category: "Handicrafts",
      rating: 4.9,
      vendor: "Jaipur Art House",
      vendorStory:
        "Master potter Ravi Kumar continues the 400-year-old tradition of Blue Pottery, using only natural dyes and traditional firing techniques.",
      description:
        "Hand-painted decorative vase with traditional floral motifs",
    },
    {
      id: 4,
      name: "Mehrangarh Fort Miniature",
      price: "₹800",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=300&fit=crop",
      region: "Rajasthani",
      category: "Fort Souvenirs",
      rating: 4.7,
      vendor: "Heritage Crafts",
      vendorStory:
        "Established in 1985, Heritage Crafts specializes in detailed architectural replicas, employing local artisans who learned the craft from their ancestors.",
      description: "Detailed miniature replica of the famous Mehrangarh Fort",
    },
    {
      id: 5,
      name: "Bengali Kantha Quilt",
      price: "₹2,800",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      region: "Bengali",
      category: "Handicrafts",
      rating: 4.8,
      vendor: "Kantha Collective",
      vendorStory:
        "Rural women from Bengal villages create these beautiful quilts using recycled fabrics, telling stories through their intricate embroidery patterns.",
      description:
        "Hand-embroidered vintage kantha quilt with traditional motifs",
    },
    {
      id: 6,
      name: "Gujarati Bandhani Dupatta",
      price: "₹950",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop",
      region: "Gujarati",
      category: "Ethnic Clothes",
      rating: 4.5,
      vendor: "Kutch Crafters",
      vendorStory:
        "From the heart of Kutch, this family business has been creating vibrant Bandhani textiles for three generations, using natural dyes and traditional techniques.",
      description: "Colorful tie-dye dupatta with mirror work and tassels",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    region: "Rajasthani",
    category: "Ethnic Clothes",
    vendor: "",
    vendorStory: "",
    description: "",
  });

  const filteredProducts = products.filter((product) => {
    const regionMatch =
      selectedRegion === "All" || product.region === selectedRegion;
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    return regionMatch && categoryMatch;
  });

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    setCart((prev) => [...prev, productId]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setNewProduct({ ...newProduct, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.vendor ||
      !newProduct.description
    ) {
      alert(
        "Please fill in all required fields, including uploading an image."
      );
      return;
    }
    const product = {
      ...newProduct,
      id: products.length + 1,
      rating: 4.0 + Math.random() * 0.9,
    };
    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      image: "",
      region: "Rajasthani",
      category: "Ethnic Clothes",
      vendor: "",
      vendorStory: "",
      description: "",
    });
    setUploadedImage(null);
    setImagePreview(null);
    setShowAddProduct(false);
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      image: "",
      region: "Rajasthani",
      category: "Ethnic Clothes",
      vendor: "",
      vendorStory: "",
      description: "",
    });
    setUploadedImage(null);
    setImagePreview(null);
    setShowAddProduct(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videos[currentVideoIndex]}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-white/10 to-black/30"></div>
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"
            style={{ top: "20%", left: "10%", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse"
            style={{
              top: "60%",
              right: "15%",
              animationDuration: "6s",
              animationDelay: "2s",
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/10 backdrop-blur-md shadow-md border-b border-white/10"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-md opacity-50"></div>
                  <div className="relative bg-white rounded-full p-2 shadow-sm">
                    <MapPin className="text-orange-500" size={20} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Shop Local
                  </h1>
                  <p className="text-xs sm:text-sm text-white">
                    Discover India's Heritage
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 hover:from-emerald-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md touch-manipulation"
                  aria-label="Add new product"
                >
                  <Plus size={16} />
                  <span className="text-xs sm:text-sm font-medium">
                    Add Product
                  </span>
                </button>
                <div className="relative">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all">
                    <ShoppingCart className="text-white" size={20} />
                  </div>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-28">
          {/* Filters */}
          <div className="relative rounded-lg shadow-md p-4 sm:p-6 mb-6 bg-white/10 backdrop-blur-md border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Filter className="text-white" size={16} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Filters
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm text-white font-semibold mb-2">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full border-0 rounded-full py-3 px-2 focus:ring-2 focus:ring-orange-500/50 bg-white/90 text-sm"
                  aria-label="Select region"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-white font-semibold mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-0 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500/50 bg-white/90 text-sm"
                  aria-label="Select category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/95 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/10 touch-manipulation"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 causes hydration error object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                      wishlist.includes(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-white"
                    } hover:scale-110 touch-manipulation`}
                    aria-label={
                      wishlist.includes(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart
                      size={16}
                      fill={wishlist.includes(product.id) ? "white" : "none"}
                    />
                  </button>
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.region}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-orange-600 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star
                        className="text-yellow-400"
                        size={14}
                        fill="current TributeErrorColor"
                      />
                      <span className="text-xs font-semibold text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg sm:text-xl font-bold text-orange-600">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <User className="text-white" size={12} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {product.vendor}
                    </span>
                    <button
                      onClick={() => setShowVendorStory(product)}
                      className="text-blue-500 hover:text-blue-600 text-xs font-semibold flex items-center space-x-1 hover:underline touch-manipulation"
                      aria-label="View vendor story"
                    >
                      <Eye size={12} />
                      <span>Story</span>
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-sm hover:shadow-md touch-manipulation"
                    aria-label="Add to cart"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <div className="bg-white/20 rounded-lg p-6 inline-block border border-white/20">
                <p className="text-white text-lg font-semibold">
                  No products found
                </p>
                <p className="text-white/80 text-sm mt-2">
                  Try adjusting your filters
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-lg">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Add New Product
                  </h2>
                  <button
                    onClick={() => resetForm()}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all touch-manipulation"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      required
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      value={newProduct.price}
                      required
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="₹1,000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Product Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-500 transition-all">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        aria-label="Upload product image"
                      />
                      {imagePreview ? (
                        <div className="text-center">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full h-40 object-cover rounded-lg mx-auto mb-3"
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 text-sm font-medium touch-manipulation"
                          >
                            Change Image
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ImageIcon className="text-gray-400" size={24} />
                          </div>
                          <p className="text-gray-600 text-xs mb-3">
                            Upload product image
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 mx-auto text-sm font-medium touch-manipulation"
                          >
                            <Upload size={16} />
                            <span>Upload Image</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Region
                      </label>
                      <select
                        value={newProduct.region}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            region: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                        aria-label="Select product region"
                      >
                        {regions.slice(1).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                        aria-label="Select product category"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      value={newProduct.vendor}
                      required
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, vendor: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Vendor Story
                    </label>
                    <textarea
                      rows="3"
                      value={newProduct.vendorStory}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          vendorStory: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="Tell the story behind this artisan or vendor..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Product Description
                    </label>
                    <textarea
                      rows="3"
                      value={newProduct.description}
                      required
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="Brief description of the product..."
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleAddProduct}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md touch-manipulation"
                      aria-label="Add product"
                    >
                      Add Product
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all touch-manipulation"
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendor Story Modal */}
        {showVendorStory && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-lg">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Meet the Artisan
                  </h2>
                  <button
                    onClick={() => setShowVendorStory(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all touch-manipulation"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <User className="text-white" size={24} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        {showVendorStory.vendor}
                      </h3>
                      <p className="text-orange-600 text-xs sm:text-sm font-medium flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{showVendorStory.region} Region</span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-l-2 border-orange-500">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center space-x-1">
                      <Star className="text-orange-500" size={16} />
                      <span>Artisan Story</span>
                    </h4>
                    <p className="text-gray-700 text-xs sm:text-sm">
                      {showVendorStory.vendorStory}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-3">
                      Featured Product:
                    </h4>
                    <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-3">
                      <img
                        src={showVendorStory.image}
                        alt={showVendorStory.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          {showVendorStory.name}
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          {showVendorStory.description}
                        </p>
                        <p className="text-lg font-bold text-orange-600">
                          {showVendorStory.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => {
                        addToCart(showVendorStory.id);
                        setShowVendorStory(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-sm hover:shadow-md touch-manipulation"
                      aria-label="Add to cart"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setShowVendorStory(null)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all touch-manipulation"
                      aria-label="Close"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopLocal;
