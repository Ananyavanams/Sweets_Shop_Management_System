import React, { useState, useEffect } from 'react';
import GulabJamunImg from '../assets/Gulabjamun.jpg';
import RasgullaImg from '../assets/Rasgulla.jpg';
import MysorePakImg from '../assets/Mysore_pak.jpg';
import KajuKatliImg from '../assets/Kajukatli.jfif';
import JalebiImg from '../assets/Jalebi.jfif';
import LadooImg from '../assets/Motichoor_Laddu.jfif';

const Product = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [products, setProducts] = useState([]);

    // Restock Modal State
    const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
    const [restockProduct, setRestockProduct] = useState(null);
    const [restockQuantity, setRestockQuantity] = useState('');

    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        category: 'milk',
        image: '',
        quantity: '',
        description: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('user'));
            const token = userData?.token;
            if (!token) return;

            const response = await fetch('http://localhost:8080/admin/sweets', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Map backend data to frontend structure if needed, or use directly
                // Backend: id, name, category, price, quantity, imageUrl
                // Frontend expects: id, name, category, price, quantity, image (mapped from imageUrl)
                const mappedProducts = data.map(p => ({
                    ...p,
                    image: p.imageUrl
                }));
                setProducts(mappedProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const token = userData?.token;

        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('category', newItem.category);
        formData.append('price', newItem.price);
        formData.append('quantity', newItem.quantity);
        if (newItem.imageFile) {
            formData.append('image', newItem.imageFile);
        }

        try {
            if (editId) {
                const response = await fetch(`http://localhost:8080/admin/sweets/${editId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        // No Content-Type header; browser sets it with boundary for FormData
                    },
                    body: formData
                });

                if (response.ok) {
                    fetchProducts();
                    resetForm();
                } else {
                    alert('Failed to update product');
                }
            } else {
                const response = await fetch('http://localhost:8080/admin/sweets', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (response.ok) {
                    fetchProducts();
                    resetForm();
                } else {
                    const errorMsg = await response.text();
                    alert('Failed to add product: ' + errorMsg);
                }
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('An error occurred while saving.');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const userData = JSON.parse(sessionStorage.getItem('user'));
            const token = userData?.token;

            try {
                const response = await fetch(`http://localhost:8080/admin/sweets/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    fetchProducts();
                } else {
                    alert('Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const resetForm = () => {
        setNewItem({ name: '', price: '', category: 'milk', image: '', quantity: '', description: '' });
        setEditId(null);
        setIsModalOpen(false);
    };

    const openEditModal = (product) => {
        setEditId(product.id);
        setNewItem({
            name: product.name,
            price: product.price || '',
            category: product.category || 'milk',
            quantity: product.quantity || '',
            image: product.image || '',
            description: product.description || ''
        });
        setIsModalOpen(true);
    };

    const openRestockModal = (product) => {
        setRestockProduct(product);
        setRestockQuantity(product.quantity);
        setIsRestockModalOpen(true);
    };

    const handleRestockSubmit = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const token = userData?.token;

        // Use FormData to handle potential file uploads or standard fields
        const formData = new FormData();
        formData.append('name', restockProduct.name);
        // Default to milk category if undefined to prevent errors
        formData.append('category', restockProduct.category || 'milk');
        formData.append('price', restockProduct.price);
        formData.append('quantity', restockQuantity);

        // Note: Image is NOT appended here to preserve existing image on backend

        try {
            const response = await fetch(`http://localhost:8080/admin/sweets/${restockProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                fetchProducts();
                setIsRestockModalOpen(false);
                setRestockProduct(null);
                setRestockQuantity('');
            } else {
                alert('Failed to restock product');
            }
        } catch (error) {
            console.error('Error restocking product:', error);
            alert('An error occurred while restocking.');
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-pink-50 p-6 flex flex-col gap-6 relative">
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
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

                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none w-full md:w-auto text-center flex items-center justify-center gap-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Item
                </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Our Sweets</h2>
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
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900">{product.name}</h3>
                                    <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded border border-pink-400">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    {parseInt(product.quantity) === 0 ? (
                                        <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded border border-red-400">
                                            Restock
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-600 font-medium">
                                            Quantity: <span className="text-gray-900">{product.quantity}</span>
                                        </span>
                                    )}
                                </div>

                                <div className="mt-auto flex gap-3 pt-4">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="flex-1 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                                <button
                                    onClick={() => openRestockModal(product)}
                                    className="w-full mt-3 text-green-600 bg-green-50 hover:bg-green-100 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center justify-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                    Restock
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No sweets found matching your search.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-5 border-b rounded-t">
                            <h3 className="text-xl font-medium text-gray-900">{editId ? 'Edit Sweet' : 'Add New Sweet'}</h3>
                            <button
                                onClick={resetForm}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddItem} className="p-6 space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                    placeholder="e.g. Besan Ladoo"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input
                                    type="text"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                    placeholder="e.g. 150"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                    placeholder="e.g. 10"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                >
                                    <option value="milk">Milk Sweets</option>
                                    <option value="dry">Dry Fruits</option>
                                    <option value="bengali">Bengali Sweets</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Sweet Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewItem({ ...newItem, imageFile: e.target.files[0] })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                />
                            </div>

                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{editId ? 'Update Sweet' : 'Add Sweet'}</button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isRestockModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                        <div className="flex justify-between items-center p-5 border-b rounded-t">
                            <h3 className="text-xl font-medium text-gray-900">Restock {restockProduct?.name}</h3>
                            <button
                                onClick={() => setIsRestockModalOpen(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <form onSubmit={handleRestockSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">New Quantity</label>
                                <input
                                    type="number"
                                    value={restockQuantity}
                                    onChange={(e) => setRestockQuantity(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                    required
                                />
                            </div>

                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Stock</button>
                                <button
                                    type="button"
                                    onClick={() => setIsRestockModalOpen(false)}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
