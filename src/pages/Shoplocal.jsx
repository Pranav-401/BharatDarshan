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
  Menu,
  Search,
  Grid,
  List,
  Camera,
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const videos = ["/videos/trad.mp4", "/videos/trad2.mp4"];

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
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, [videos.length]);

  // Update video source when currentVideoIndex changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = videos[currentVideoIndex];
      video.load();
      video.play().catch(console.error);
    }
  }, [currentVideoIndex, videos]);

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
        "/images/rajsre.jpg",
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
        "/images/gamosa.jpg",
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
        "/images/raj.png",
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
    "/images/meg.jpg",
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
       "/images/kant.jpg",
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
      "/images/gujsr.jpg",
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

  const [previewImage, setPreviewImage] = useState("");

  const filteredProducts = products.filter((product) => {
    const regionMatch =
      selectedRegion === "All" || product.region === selectedRegion;
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return regionMatch && categoryMatch && searchMatch;
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setNewProduct({ ...newProduct, image: imageUrl });
        setPreviewImage(imageUrl);
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
      alert("Please fill in all required fields");
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
    setPreviewImage("");
    setShowAddProduct(false);
  };

  const ProductCard = ({ product }) => (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        viewMode === "list" ? "md:flex" : ""
      }`}
    >
      <div
        className={`relative ${
          viewMode === "list" ? "md:w-48 md:flex-shrink-0" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover ${
            viewMode === "list" ? "h-48 md:h-full" : "h-64"
          }`}
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            wishlist.includes(product.id)
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-600"
          } hover:scale-110 transition-transform shadow-md`}
        >
          <Heart
            size={18}
            fill={wishlist.includes(product.id) ? "white" : "none"}
          />
        </button>
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {product.region}
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <Star className="text-yellow-400" size={16} fill="currentColor" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl md:text-2xl font-bold text-orange-600">
            {product.price}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <User className="text-gray-400" size={16} />
          <span className="text-sm text-gray-600 flex-1">
            by {product.vendor}
          </span>
          <button
            onClick={() => setShowVendorStory(product)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1"
          >
            <Eye size={14} />
            <span>Story</span>
          </button>
        </div>

        <button
          onClick={() => addToCart(product.id)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-98"
          autoPlay
          muted
          playsInline
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-red-50/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
              ? "bg-white/20 backdrop-blur-lg shadow-lg border-b border-white/30"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 drop-shadow-sm">
                    Shop Local
                  </h1>
                  <p className="text-xs md:text-sm text-gray-700 drop-shadow-sm">
                    Discover India's Heritage
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
                <div className="relative">
                  <ShoppingCart
                    className="text-gray-700 drop-shadow-sm cursor-pointer"
                    size={24}
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-gray-700 drop-shadow-sm"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="md:hidden mt-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setShowAddProduct(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:from-green-600 hover:to-green-700 transition-colors"
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </button>
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="text-gray-700" size={20} />
                    <span className="text-gray-700">Cart ({cart.length})</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6 pt-24 md:pt-32">
          {/* Search and View Controls */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products, vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Filter size={20} />
                  <span>Filters</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden md:block"
            } rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 relative overflow-hidden backdrop-blur-sm`}
            style={{
              backgroundImage: `url('/images/trad5.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <Filter className="text-white" size={20} />
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Filters
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
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
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-6 md:gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-800 text-lg font-medium bg-white/80 backdrop-blur-sm rounded-lg p-6 inline-block">
                No products found for the selected filters.
              </p>
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Add New Product
                  </h2>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="₹1,000"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image *
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Upload size={20} />
                          <span>Upload Image</span>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        {previewImage && (
                          <span className="text-sm text-green-600">
                            Image uploaded!
                          </span>
                        )}
                      </div>
                      {previewImage && (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage("");
                              setNewProduct({ ...newProduct, image: "" });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {regions.slice(1).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.vendor}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, vendor: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell the story behind this artisan or vendor..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Description *
                    </label>
                    <textarea
                      required
                      rows="2"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Brief description of the product..."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 pt-4">
                    <button
                      onClick={handleAddProduct}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors"
                    >
                      Add Product
                    </button>
                    <button
                      onClick={() => setShowAddProduct(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Meet the Artisan
                  </h2>
                  <button
                    onClick={() => setShowVendorStory(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                        {showVendorStory.vendor}
                      </h3>
                      <p className="text-gray-600">
                        {showVendorStory.region} Region
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {showVendorStory.vendorStory}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Featured Product:
                    </h4>
                    <div className="flex items-center space-x-4">
                      <img
                        src={showVendorStory.image}
                        alt={showVendorStory.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {showVendorStory.name}
                        </p>
                        <p className="text-orange-600 font-bold">
                          {showVendorStory.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden z-40">
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:from-green-600 hover:to-green-700 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopLocal;
