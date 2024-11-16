'use client'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaterialCalculator = () => {
const [tinggi, setTinggi] = useState<number | ''>('');
const [lebar, setLebar] = useState<number | ''>('');
const [sparePond, setSparePond] = useState<number | ''>('');
const [kupingan, setKupingan] = useState<number | ''>('');
const [resultBody, setResultBody] = useState<string>('');
const [resultPintu, setResultPintu] = useState<string>('');
const [resultTotal, setResultTotal] = useState<string>('');

const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Data awal
        const hargaMaterial = {
        tebal3mm: 115000,
        tebal5mm: 210000,
        };

        const ukuranMaterial = {
        panjang: 3000,
        lebar: 2000,
        };

        // Hitungan Body
        const body = {
        panjang: Number(tinggi) + Number(lebar) + Number(tinggi) + Number(sparePond), // panjang body
        lebar: Number(tinggi) + Number(tinggi) + Number(lebar) + Number(sparePond), // lebar body 
        };

        // Hitungan Pintu
        const pintu = {
        panjang: Number(tinggi) + Number(kupingan) + Number(sparePond), // panjang pintu
        lebar: Number(kupingan) + Number(lebar) + Number(kupingan) + Number(sparePond), // lebar pintu
        };

        // Menghitung jumlah potongan per bagian (Body dan Pintu)
        const hitungPotongan = (
        ukuranLembar: { panjang: number; lebar: number },
        ukuranBagian: { panjang: number; lebar: number },
        hanyaPanjang = false
        ) => {
        const potonganPanjang = Math.floor(ukuranLembar.panjang / ukuranBagian.panjang);
        if (hanyaPanjang) {
            return potonganPanjang;
        }
        const potonganLebar = Math.floor(ukuranLembar.lebar / ukuranBagian.lebar);
        return potonganPanjang * potonganLebar;
        };

        const jumlahBody = hitungPotongan(ukuranMaterial, body);
        const jumlahPintu = hitungPotongan(ukuranMaterial, pintu);

        // Perhitungan harga material untuk masing-masing bagian
        const hitungHargaMaterial = (harga: number, jumlah: number) => {
        return harga / jumlah;
        };

        // Asumsi kita menggunakan material tebal 5 mm
        const hargaPerLembar = hargaMaterial.tebal5mm;

        // Harga material per bagian
        const hargaMaterialBody = hitungHargaMaterial(hargaPerLembar, jumlahBody);
        const hargaMaterialPintu = hitungHargaMaterial(hargaPerLembar, jumlahPintu);
        const totalHargaMaterial = hargaMaterialBody + hargaMaterialPintu;

        // Format output data inputan
        const bodyResult = `Total potongan untuk Body: ${jumlahBody} pcs\nHarga material per Box (Body): Rp ${hargaMaterialBody.toFixed(2)}`;
        const pintuResult = `Total potongan untuk Pintu: ${jumlahPintu} pcs\nHarga material per Box (Pintu): Rp ${hargaMaterialPintu.toFixed(2)}`;
        const totalResult = `Total harga material per Box (Body + Pintu): Rp ${totalHargaMaterial.toFixed(2)}`;

        // Update state dengan hasil perhitungan
        setResultBody(bodyResult.replace(/\n/g, '<br>'));
        setResultPintu(pintuResult.replace(/\n/g, '<br>'));
        setResultTotal(totalResult.replace(/\n/g, '<br>'));
    };

    const handleReset = () => {
        // Reset semua input dan hasil
        setTinggi('');
        setLebar('');
        setSparePond('');
        setKupingan('');
        setResultBody('');
        setResultPintu('');
        setResultTotal('');
    };

    return (
        <div className="container">
        <div className="card mt-5">
            <div className="card-header bg-primary text-white">
            <h4 className="card-title text-center">Perhitungan Harga Material Box</h4>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="tinggi">Tinggi (mm)</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    id="tinggi"
                    placeholder="Masukkan Tinggi (mm)"
                    value={tinggi}
                    onChange={(e) => setTinggi(e.target.value ? parseInt(e.target.value) : '')}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="lebar">Lebar (mm)</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    id="lebar"
                    placeholder="Masukkan Lebar (mm)"
                    value={lebar}
                    onChange={(e) => setLebar(e.target.value ? parseInt(e.target.value) : '')}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="sparePond">Spare Pond (mm)</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    id="sparePond"
                    placeholder="Masukkan Spare Pond (mm)"
                    value={sparePond}
                    onChange={(e) => setSparePond(e.target.value ? parseInt(e.target.value) : '')}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="kupingan">Kupingan (mm)</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    id="kupingan"
                    placeholder="Masukkan Kupingan (mm)"
                    value={kupingan}
                    onChange={(e) => setKupingan(e.target.value ? parseInt(e.target.value) : '')}
                    required
                />
                </div>
                <button type="submit" className="btn btn-primary mr-2">
                Hitung
                </button>
                <button type="button" className="btn btn-danger" onClick={handleReset}>
                Reset
                </button>
            </form>

            <div className="result-box mt-4">
                <h5>Hasil Perhitungan:</h5>
                <div
                id="resultBody"
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: resultBody }}
                ></div>
                <div
                id="resultPintu"
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: resultPintu }}
                ></div>
                <div
                id="resultTotal"
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: resultTotal }}
                ></div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default MaterialCalculator;
