"use client" 
import React from 'react' 
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

type Material = 'plastik' | 'kardus' | ''

const Perhitungan = () => { 
    const [material, setMaterial] = useState<Material>('') 
    const [length, setLength] = useState<string>('') 
    const [width, setWidth] = useState<string>('') 
    const [height, setHeight] = useState<string>('') 
    const [volume, setVolume] = useState<number | null>(null) 
    const [price, setPrice] = useState<number | null>(null) 
    const [quantity, setQuantity] = useState<string | null>(null) 
    const [totalPrice, setTotalPrice] = useState<number | null>(null)

    // State untuk menyimpan data yang akan dikirim via WhatsApp
    const [whatsappMessage, setWhatsappMessage] = useState<string>('')

    const calculate = (e: FormEvent) => { 
        e.preventDefault()

        const parsedLength = parseFloat(length) 
        const parsedWidth = parseFloat(width) 
        const parsedHeight = parseFloat(height) 
        const parsedQuantity = quantity ? parseFloat(quantity) : null

        if (parsedLength && parsedWidth && parsedHeight) { 
            const calculatedVolume = 2 * (parsedLength * parsedWidth + parsedLength * parsedHeight + parsedWidth * parsedHeight) 
            setVolume(calculatedVolume)

            let calculatedPrice = 0 
            if (material === 'kardus') { 
                calculatedPrice = calculatedVolume 
            } else if (material === 'plastik') { 
                calculatedPrice = calculatedVolume * 2 
            }

            setPrice(calculatedPrice)

            // Calculate total price
            let newTotalPrice = calculatedPrice
            if (parsedQuantity) { 
                newTotalPrice = calculatedPrice * parsedQuantity 
            } 
            setTotalPrice(newTotalPrice)

            // Menyusun pesan untuk WhatsApp dengan total harga yang benar
            const message = `Selamat pagi, saya ingin memesan kotak dengan detail berikut:\n\nMaterial: ${material}\nPanjang: ${length} cm\nLebar: ${width} cm\nTinggi: ${height} cm\nLuas kotak: ${calculatedVolume} cm³\nHarga satuan: ${calculatedPrice} IDR\nJumlah kotak: ${quantity || 'Tidak ditentukan'}\nTotal Harga: ${newTotalPrice} IDR` 
            setWhatsappMessage(message) 
            
        } 
    }

    const resetForm = () => { 
        setMaterial('') 
        setLength('') 
        setWidth('') 
        setHeight('') 
        setVolume(null) 
        setPrice(null) 
        setQuantity(null) 
        setTotalPrice(null) 
        setWhatsappMessage('') 
    }

    const handleWhatsappClick = () => { 
        if (whatsappMessage) { 
            const whatsappURL = `https://wa.me/+628978332719?text=${encodeURIComponent(whatsappMessage)}` 
            window.open(whatsappURL, '_blank') 
        } 
    }

    return ( 
        <> 
        <div className="container mt-5"> 
            <h2 className="text-center mb-4">Perhitungan Material dan Ukuran Kotak</h2> 
            <div className="card p-4 shadow-sm"> 
                <form onSubmit={calculate}> 
                    <div className="mb-3"> 
                        <label htmlFor="material" className="form-label">Material:</label> 
                        <select 
                            value={material} 
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setMaterial(e.target.value as Material)} 
                            id="material" 
                            className="form-select" 
                            required 
                        > 
                            <option value="" disabled>Pilih Material</option> 
                            <option value="plastik">Plastik</option> 
                            <option value="kardus">Kardus</option> 
                        </select> 
                    </div> 
                    <div className="mb-3"> 
                        <label htmlFor="length" className="form-label">Panjang (cm):</label> 
                        <input 
                            type="number" 
                            value={length} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLength(e.target.value)} 
                            id="length" 
                            className="form-control" 
                            placeholder="0" 
                            required 
                        /> 
                    </div> 
                    <div className="mb-3"> 
                        <label htmlFor="width" className="form-label">Lebar (cm):</label> 
                        <input 
                            type="number" 
                            value={width} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setWidth(e.target.value)} 
                            id="width" 
                            className="form-control" 
                            placeholder="0" 
                            required 
                        /> 
                    </div> 
                    <div className="mb-3"> 
                        <label htmlFor="height" className="form-label">Tinggi (cm):</label> 
                        <input 
                            type="number" 
                            value={height} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setHeight(e.target.value)} 
                            id="height" 
                            className="form-control" 
                            placeholder="0" 
                            required 
                        /> 
                    </div> 
                    <div className="mb-3"> 
                        <label htmlFor="quantity" className="form-label">Jumlah Kotak yang Dibeli (Opsional):</label> 
                        <input 
                            type="number" 
                            value={quantity || ''} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)} 
                            id="quantity" 
                            className="form-control" 
                            placeholder="Masukkan jumlah kotak" 
                        /> 
                    </div> 
                    <div className="d-flex gap-2"> 
                        <button type="submit" className="btn btn-primary px-3 py-2">Hitung</button> 
                        <button type="button" onClick={resetForm} className="btn btn-danger px-4 py-2">Reset</button> 
                    </div> 
                </form> 
                {volume !== null && ( 
                    <div className="alert alert-info mt-4" role="alert"> 
                        <h4 className="alert-heading">Hasil Perhitungan</h4> 
                        <p>Material = {material}</p> 
                        <p>Panjang = {length} cm</p> 
                        <p>Lebar = {width} cm</p> 
                        <p>Tinggi = {height} cm</p> 
                        <hr /> 
                        <p>Luas kotak = <strong>{volume}</strong> cm³</p> 
                        <p>Harga satuan = <strong>{price}</strong> IDR</p> 
                        <p>Jumlah kotak = <strong>{quantity || 'Tidak ditentukan'}</strong> pcs</p> 
                        <p>Total Harga = <strong>{totalPrice ? totalPrice : 'Tidak ditentukan'}</strong> IDR</p> 
                        <button onClick={handleWhatsappClick} className="btn btn-success"> 
                            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> 
                            Lanjut ke WhatsApp 
                        </button> 
                    </div> 
                )} 
            </div> 
        </div> <br/>
        </> 
    ) 
}

export default Perhitungan
