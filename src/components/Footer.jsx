import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-100 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left ml-8">
                            <Link to="/" className="text-black cursive text-xl font-bold flex items-center">
                                ArtistsNetwork
                            </Link>
                            <p className="mt-2 text-black">Showcasing the best and worst artworks, because every art is appreciated.</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-center md:text-right">
                            <Link to="/gallery" className="text-gray-900 underlined text-md px-4">
                                Gallery
                            </Link>
                            <Link to="/explore" className="text-gray-900 underlined text-md px-4">
                                Explore
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4 text-center border-t border-gray-700 pt-4 text-black">
                        <p>&copy; 2024 ArtistNetwork. All rights reserved.</p>
                        <p>Links:
                            <a target='_blank' href="https://github.com/ishitaraina1807/ArtistNetwork-Frontend" className="text-black mx-2 hover:underline">GitHub (frontend)</a>
                            <a target='_blank' href="https://github.com/Eklavya-sus/ArtistsNetwork-Backend" className="text-black mx-2 hover:underline">GitHub (backend)</a>
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
