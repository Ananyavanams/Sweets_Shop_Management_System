import React, { useState, useEffect } from 'react';


const Purchase = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [products, setProducts] = useState([]);

    const fetchSweets = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('user'));
            const token = userData?.token;

            if (!token) return;

            const response = await fetch('http://localhost:8080/user/sweets', {
                headers: {
                    // Include auth token in header for secure access
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const mappedProducts = data.map(product => ({
                    ...product,
                    image: product.imageUrl, // Only use backend image
                    cost: `₹${product.price}` // Map price to cost for display
                }));
                setProducts(mappedProducts);
            }
        } catch (error) {
            console.error('Error fetching sweets:', error);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    // Filtering logic
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handlePurchase = async (product) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('user'));
            const token = userData?.token;

            if (!token) {
                alert('Please login to purchase items');
                return;
            }

            const response = await fetch(`http://localhost:8080/user/purchase/${product.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert(`Successfully purchased ${product.name}!`);
                fetchSweets(); // Refresh the product list to update quantities
            } else {
                const errorMsg = await response.text();
                alert(`Purchase failed: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('An error occurred during purchase');
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-6 flex flex-col gap-6">
            {/* Navbar Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Left: Category & Search */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block p-2.5 outline-none"
                    >
                        <option value="all">All Categories</option>
                        <option value="milk">Milk Sweets</option>
                        <option value="dry">Dry Fruits</option>
                        <option value="bengali">Bengali Sweets</option>
                    </select>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search sweets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>

        
                <div className="hidden md:block"></div>
            </div>

            {/* Product Grid Section */}
            <h2 className="text-2xl font-bold text-gray-800">Available Sweets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-lg font-semibold text-pink-600 mb-2">{product.cost}</p>
                                <p className="text-sm text-gray-600 mb-4">Quantity: {product.quantity}</p>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => handlePurchase(product)}
                                        disabled={product.quantity === 0}
                                        className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors flex items-center justify-center gap-2 ${product.quantity === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300'
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                        {product.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No sweets found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Purchase;
