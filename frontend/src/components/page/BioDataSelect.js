import React from "react";
import ReactSelect from "react-select";

export const listPekerjaan = [
  "Belum Tidak Bekerja",
  " Mengurus Rumah Tangga",
  "Pelajar Mahasiswa",
  "Pensiunan",
  "Pewagai Negeri Sipil",
  "Tentara Nasional Indonesia",
  "Kepolisisan RI",
  "Perdagangan",
  "Petani Pekebun",
  "Peternak, Nelayan",
  "Perikanan",
  "Industri",
  "Konstruksi",
  "Transportasi",
  "Karyawan Swasta",
  "Karyawan BUMN",
  "Karyawan BUMD",
  "Karyawan Honorer",
  " Buruh Harian Lepas",
  "Buruh Tani Perkebunan",
  " Buruh Nelayan Perikanan",
  "Buruh Peternakan",
  "Pembantu Rumah Tangga",
  "Tukang Cukur",
  "Tukang Listrik",
  "Tukang Batu",
  "Tukang Kayu",
  "Tukang Sol Sepatu",
  "Tukang Las Pandai Besi",
  "Tukang Jahit",
  "Tukang Gigi",
  "Penata Rias",
  "Penata Busana",
  "Penata Rambut",
  "Mekanik, Seniman",
  "Tabib",
  "Paraji",
  "Perancang Busana",
  "Penterjemah",
  "Imam Masjid",
  "Pendeta",
  "Pastor",
  "Wartawan",
  "Ustadz Mubaligh",
  "Juru Masak",
  "Promotor Acara",
  "Anggota DPRRI",
  "Anggota DPD",
  "Anggota BPK",
  "Presiden",
  "Wakil Presiden",
  "Anggota Mahkamah Konstitusi",
  "Anggota Kabinet Kementerian",
  "Duta Besar",
  "Gubernur",
  "Wakil Gubernur",
  "Bupati",
  "Wakil Bupati",
  "Walikota",
  "Wakil Walikota",
  "Anggota DPRD Provinsi",
  "Anggota DPRD Kabupaten Kota",
  "Dosen",
  "Guru",
  "Pilot",
  "Pengacara",
  "Notaris",
  "Arsitek",
  "Akuntan",
  "Konsultan",
  "Dokter",
  "Bidan",
  "Perawat",
  "Apoteker",
  "Psikiater Psikolog",
  "Penyiar Televisi",
  "Penyiar Radio",
  "Pelaut",
  "Peneliti",
  "Sopir",
  "Pialang",
  "Paranormal",
  "Pedagang",
  "Perangkat Desa",
  "Kepala Desa",
  "Biarawati",
  "Wiraswasta",
];
const listAgama = [
  "ISLAM",
  "KRISTEN KATOLIK",
  "KRISTEN PROTESTAN",
  "HINDU",
  "BUDDHA",
  "KONGHUCU",
  "JAWA",
];

export const jenisKelamin = ["LAKI-LAKI", "PEREMPUAN"];
export const golonganDarah = ["A", "B", "AB", "O", "OB"];
export const statusPerkawinan = [
  "BELUM KAWIN",
  "KAWIN",
  "CERAI HIUDP",
  "CERAI MATI",
];
export const kewarganegaraan = ["WNI", "WNA"];
export const PekerjaanSelect = () => {
  return (
    <>
      <select
        name="pekerjaan"
        id="pekerjaan"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      >
        <option selected disabled>
          Pekerjaan
        </option>
        {listPekerjaan.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};

export const AgamaSelect = () => {
  return (
    <>
      <select
        name="agama"
        id="agama"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      >
        <option selected disabled>
          Agama
        </option>
        {listAgama.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};
export const KelaminSelect = () => {
  return (
    <>
      <select
        name="jenisKelamin"
        id="Kelamin"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      >
        <option selected disabled>
          Kelamin
        </option>
        {jenisKelamin.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};
export const GolonganDarahSelect = () => {
  return (
    <>
      <select
        name="golonganDarah"
        id="golonganDarah"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      >
        <option selected disabled>
          Golongan Darah
        </option>
        {golonganDarah.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};
export const StatusPernikahanSelect = () => {
  return (
    <>
      <select
        name="statusPernikahan"
        id="StatusPernikahan"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      >
        <option selected disabled>
          Status Pernikahan
        </option>
        {statusPerkawinan.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};
export const KewargaNegaraanSelect = () => {
  return (
    <>
      <select
        name="kewarganegaraan"
        id="KewargaNegaraan"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      >
        <option selected disabled>
          KewargaNegaraan
        </option>
        {kewarganegaraan.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};

export default (AgamaSelect,
PekerjaanSelect,
KelaminSelect,
GolonganDarahSelect,
StatusPernikahanSelect,
KewargaNegaraanSelect,
listPekerjaan,
jenisKelamin,
golonganDarah,
kewarganegaraan,
statusPerkawinan);
