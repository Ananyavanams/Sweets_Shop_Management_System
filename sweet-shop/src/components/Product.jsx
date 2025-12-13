import React, { useState } from 'react';
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
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        category: 'milk',
        image: '',
        quantity: '',
    });

    // Mock data for sweets with price and category
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Gulab Jamun',
            price: '₹120',
            category: 'milk',
            image: GulabJamunImg,
            quantity: 10,
        },
        {
            id: 2,
            name: 'Rasgulla',
            price: '₹100',
            category: 'bengali',
            image: RasgullaImg,
            quantity: 5,
        },
        {
            id: 3,
            name: 'Mysore Pak',
            price: '₹150',
            category: 'milk',
            image: MysorePakImg,
            quantity: 0,
        },
        {
            id: 4,
            name: 'Kaju Katli',
            price: '₹300',
            category: 'dry',
            image: KajuKatliImg,
            quantity: 8,
        },
        {
            id: 5,
            name: 'Jalebi',
            price: '₹80',
            category: 'bengali',
            image: JalebiImg,
            quantity: 15,
        },
        {
            id: 6,
            name: 'Ladoo',
            price: '₹90',
            category: 'milk',
            image: LadooImg,
            quantity: 0,
        },
    ]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return;

        if (editId) {
            // Update existing product
            setProducts(products.map(p => p.id === editId ? { ...p, ...newItem, image: newItem.image || p.image } : p));
            setEditId(null);
        } else {
            // Add new product
            const newProduct = {
                id: products.length + 1,
                ...newItem,
                image: newItem.image || 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=500&auto=format&fit=crop',
            };
            setProducts([...products, newProduct]);
        }

        setIsModalOpen(false);
        setNewItem({ name: '', price: '', category: 'milk', image: '', quantity: '' });
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setNewItem({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: product.quantity
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    // Filtering logic
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-pink-50 p-6 flex flex-col gap-6 relative">
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

                {/* Right: Add Item Button */}
                <button
                    onClick={() => {
                        setEditId(null);
                        setNewItem({ name: '', price: '', category: 'milk', image: '', quantity: '' });
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

            {/* Product Grid Section */}
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
                                        {product.price}
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
                                        onClick={() => handleEdit(product)}
                                        className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex-1 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                        Delete
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

            {/* Add Item Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-5 border-b rounded-t">
                            <h3 className="text-xl font-medium text-gray-900">{editId ? 'Edit Sweet' : 'Add New Sweet'}</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
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
                                    placeholder="e.g. ₹150"
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
                                <label className="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
                                <input
                                    type="text"
                                    value={newItem.image}
                                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                    placeholder="Optional image URL"
                                />
                            </div>

                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button type="submit" className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{editId ? 'Update Sweet' : 'Add Sweet'}</button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
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
