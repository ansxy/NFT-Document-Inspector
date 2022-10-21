import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { ethers } from "ethers";
import KtpNFT from "../../contracts/KtpNFT.json";
import KtpNFT_address from "../../contracts/KtpNFT-address.json";
import KtpInspector from "../../contracts/KtpInspector.json";
import KtpInspectorAddress from "../../contracts/KtpInspector-address.json";
import { setNftUri, getImgBytecode } from "../../utils/method";
import axios from "axios";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractKtp = new ethers.Contract(
  KtpNFT_address.KtpNFT,
  KtpNFT.abi,
  signer
);

const contractInspector = new ethers.Contract(
  KtpInspectorAddress.KtpInspector,
  KtpInspector.abi,
  signer
);
console.log(contractInspector);

export default function DetailPage() {
  const data = useLoaderData();
  const [uri, seturi] = useState("");
  const [fotoByte, setFotoByte] = useState("");
  const [addFotoStatus, setAddFotoStatus] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [mintingKTP, setmintingKTP] = useState(false);
  const [addNFT, setaddNFT] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const mintToken = async (e) => {
    e.preventDefault();
    setLoading(false);
    addFotoKtp();
    await temp();
    const result = await contractKtp.safeMint(data.data.addressWallet, uri);
    setmintingKTP(true);
    await addKtp();
    setaddNFT(true);
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const uri = await setNftUri(data.data.addressWallet, "ktp");
      const imgByteCode = await getImgBytecode(
        data.data.namaFile,
        data.data.tipeMime,
        "ktp"
      );

      return [seturi(uri), setFotoByte(imgByteCode)];
    };
    fetchData();
  }, [data.data.addressWallet, data.data.namaFile, data.data.tipeMime]);

  let fotoktp = new FormData();
  fotoktp = {
    addressWallet: data.data.addressWallet,
    imgString: fotoByte,
  };

  const addFotoKtp = async (e) => {
    try {
      return await axios.post("http://localhost:3001/api/fotoktp", fotoktp);
    } catch (error) {
      setAddFotoStatus(true);
      console.log(error);
    }
    setAddFotoStatus(true);
  };

  const temp = async () => {
    const addUser = await contractInspector.addUser(data.data.addressWallet);
    setAddUser(true);
    return addUser;
  };

  const nikGenerator = async (e) => {
    if (data.data.jenisKelamin === "LAKI-LAKI") {
      const day = data.data.tanggalLahir.split("-");
      const year = day[0].split("");
      //TODO : Count System
      const nik =
        data.data.idKecamatan + day[2] + day[1] + year[1] + year[2] + "0003";
      return nik;
    } else {
      const day = data.data.tanggalLahir.split("-");
      const womanDay = parseInt(day[2]) + 40;
      const year = day[0].split("");
      const nik =
        data.data.idKecamatan +
        womanDay.toString() +
        day[1] +
        year[1] +
        year[2] +
        "-" +
        "0003";
      return nik;
    }
  };
  const addKtp = async (e) => {
    const addr = data.data.addressWallet;
    const nik = await nikGenerator();
    const result = await contractInspector.addKtp(
      addr,
      KtpNFT_address.KtpNFT,
      nik,
      uri
    );

    await result.wait();
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-3/5 justify-start items-center">
          <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              Validasi Kartu Tanda Penduduk
            </h2>
          </div>
          <div className="flex bg-white w-full h-screen overflow-auto">
            <form
              method="post"
              encType="multipart/form-data"
              className=" flex-col mr-10 ml-10  w-full gap-4"
            >
              <fieldset disabled="disabled">
                <div className="h-1/6 grid grid-rows-1 mt-5">
                  <div className="h-full w-full flex flex-col justify-center ">
                    <label
                      for="addressWallet"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Address Wallet
                    </label>
                    <input
                      name="addressWallet"
                      id="addressWallet"
                      value={data.data.addressWallet}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg col-span-2"
                      required
                    />
                  </div>
                </div>
                {/* Section 1 */}
                <div className=" grid grid-rows-3 gap-y-4 mb-10 mt-10">
                  {/* Grid 1 in Section 1 */}
                  <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                    {/* Nama */}
                    <div class="mb-6 col-span-2 w-full">
                      <label
                        for="nama"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Nama
                      </label>
                      <input
                        name="nama"
                        value={data.data.nama}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                        placeholder="Nama"
                        required
                      />
                    </div>
                    {/* Agama Select */}
                    <div className="mb-6 w-full">
                      <label
                        for="addressWallet"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Agama
                      </label>
                      <input
                        name="agama"
                        id="agama"
                        value={data.data.agama}
                        required
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                    {/* Pekerjaan Select */}
                    <div className="mb-6 w-full">
                      <label
                        for="addressWallet"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Pekerjaan
                      </label>
                      <input
                        name="pekerjaan"
                        id="pekerjaan"
                        value={data.data.pekerjaan}
                        required
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                  </div>
                  {/* Grid 2 in Section 1 */}
                  <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                    <div className="mb-7 w-full">
                      <label
                        for="kotaLahir"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kota Lahir
                      </label>
                      <input
                        name="kotaLahir"
                        id="kotaLahir"
                        value={data.data.kotaLahir}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                        placeholder="Kota Lahir"
                      />
                    </div>
                    <div className="relative w-full col-span-1">
                      <div className="mb-7 w-full">
                        <label
                          for="tanggalLahir"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Tanggal Lahir
                        </label>
                        <input
                          name="tanggalLahir"
                          type="text"
                          id="tanggalLahir"
                          value={data.data.tanggalLahir}
                          placeholder="tanggalLahir"
                          required
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                        />
                      </div>
                    </div>
                    {/* Jenis Kelamin */}
                    <div className="mb-7 w-full">
                      <label
                        for="jenisKelamin"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Jenis Kelamin
                      </label>
                      <input
                        name="jenisKelamin"
                        id="Kelamin"
                        value={data.data.jenisKelamin}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                    {/* Golongan Darah */}
                    <div className="mb-7 w-full">
                      <label
                        for="golonganDarah"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Golongan Darah
                      </label>
                      <input
                        name="golonganDarah"
                        id="golonganDarah"
                        value={data.data.golonganDarah}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                  </div>
                  {/* Grid 3 in Section 1 */}
                  <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                    <div className="mb-6 w-full">
                      <label
                        for="statusPerkawinan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Status Perkawinan
                      </label>
                      <input
                        name="statusPerkawinan"
                        id="StatusPernikahan"
                        value={data.data.statusPerkawinan}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <label
                        for="kewarganegaraan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kewarganegaraan
                      </label>
                      <input
                        name="kewarganegaraan"
                        id="KewargaNegaraan"
                        value={data.data.kewarganegaraan}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                  </div>
                </div>
                {/* Section 2 */}
                <div className=" grid grid-rows-3 gap-y-4">
                  {/* Grid 1 in Section 2 */}
                  <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                    {/* Alamat */}
                    <div className="mb-6 w-full col-span-2">
                      <label
                        for="statusPerkawinan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Alamat Sekarang
                      </label>
                      <input
                        name="alamat"
                        type="text"
                        id="alamat"
                        placeholder="Alamat"
                        value={data.data.alamat}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      />
                    </div>
                    {/* Rukun Tetangga */}
                    <div className="mb-6 w-full">
                      <label
                        for="rukunTetangga"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Rukun Warga
                      </label>
                      <input
                        name="rukunTetangga"
                        type="text"
                        id="rt"
                        value={data.data.rukunTetangga}
                        placeholder="RT"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg"
                      />
                    </div>
                    {/* Rukun Warga */}
                    <div className="mb-6 w-full">
                      <label
                        for="rukunWarga"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Rukun Warga
                      </label>
                      <input
                        name="rukunWarga"
                        type="text"
                        id="rw"
                        value={data.data.rukunWarga}
                        placeholder="RW"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg"
                      />
                    </div>
                  </div>
                  {/* Grid 2 in Section 2 */}
                  <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                    {/* Prov Select */}
                    <div className="mb-6 w-full col-span-2">
                      <label
                        for="Provinsi"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Provinsi Sekarang
                      </label>
                      <input
                        name="provinsiAlamatSekarang"
                        type="text"
                        id="provinsiAlamatSekarang"
                        placeholder="provinsiAlamatSekarang"
                        required
                        value={data.data.provinsiAlamatSekarang}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      />
                    </div>
                    <div className="mb-6 w-full col-span-2">
                      <label
                        for="kotaAlamatSekarang"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kabupaten Sekarang
                      </label>
                      <input
                        name="kotaAlamatSekarang"
                        type="text"
                        id="kotaAlamatSekarang"
                        placeholder="kotaAlamatSekarang"
                        value={data.data.kotaAlamatSekarang}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      />
                    </div>
                  </div>
                  {/* Grid 3 in Section 2 */}
                  <div className="h-full w-full grid grid-cols-4 place-items-center gap-4">
                    <div className="mb-6 w-full col-span-2">
                      {" "}
                      <label
                        for="Kecamatan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kecamatan Sekarang
                      </label>
                      <input
                        name="kecamatan"
                        type="text"
                        id="kecamatan"
                        placeholder="kecamatan"
                        required
                        value={data.data.kecamatan}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      />
                    </div>
                    <div className="mb-6 w-full col-span-2">
                      {" "}
                      <label
                        for="Kelurahan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kelurahan Sekarang
                      </label>
                      <input
                        name="kelurahan"
                        type="text"
                        id="kelurahan"
                        placeholder="kelurahan"
                        value={data.data.kelurahan}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      />
                    </div>
                  </div>
                  {/* Grid 4 in Section 2 */}
                </div>
                <div className="h-1/6 grid grid-rows-1">
                  <div className="w-full grid grid-cols-4 place-items-center gap-4">
                    <div className="mb-6 w-full col-span-2">
                      <label
                        for="foto"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Foto 3x4
                      </label>
                      <div className="bg-black w-[22.125rem] h-[29.5rem] flex">
                        <img
                          className="object-cover"
                          src={
                            process.env.REACT_APP_BASE_URL +
                            data.data.addressWallet +
                            ".jpg"
                          }
                          alt="test"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="grid grid-rows-1 gap-y-4 pb-8">
                <div className="w-full h-12 grid grid-cols-4 place-items-center gap-4">
                  <button
                    id="dropdownDefault"
                    style={{ transition: "all .15s ease" }}
                    onClick={mintToken}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none h-full focus:ring-blue-300 font-medium rounded-lg text-sm text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full col-start-4"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading ? (
        <></>
      ) : (
        <div
          id="popup-modal"
          class="overflow-y-auto overflow-x-hidden fixed flex justify-center place-items-center backdrop-blur-sm md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="p-6 text-center">
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div className="flex flex-row justify-center place-content-center">
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Add ImageByteCode to database
                  </h3>
                  <div role="status" className="ml-5">
                    {!addFotoStatus ? (
                      <svg
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <svg
                        class="w-8 h-8 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="fill-green-500"
                          stroke-width="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-center place-content-center">
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Add User To Blockchain
                  </h3>
                  <div role="status" className="ml-5">
                    {!addUser ? (
                      <svg
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <svg
                        class="w-8 h-8 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="fill-green-500"
                          stroke-width="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex flex-row justify-center place-content-center">
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Minting NFT KTP
                  </h3>
                  <div role="status" className="ml-5">
                    {!mintingKTP ? (
                      <svg
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <svg
                        class="w-8 h-8 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="fill-green-500"
                          stroke-width="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-center place-content-center">
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Add NFT to Blockchain
                  </h3>
                  <div role="status" className="ml-5">
                    {!addNFT ? (
                      <svg
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <svg
                        class="w-8 h-8 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="fill-green-500"
                          stroke-width="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
                {addNFT ? (
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-green-700 
                    hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => setLoading(true)}
                  >
                    Done
                  </button>
                ) : (
                  <button
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 cursor-not-allowed"
                    disabled
                  >
                    Loading
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
