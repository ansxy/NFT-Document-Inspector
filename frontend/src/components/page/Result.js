import { useLocation } from "react-router-dom";
import base64 from "react-native-base64";

export default function Result() {
  const { state } = useLocation();
  console.log(state);
  const split = state[3].split(",").slice(1);
  const decode = JSON.parse(base64.decode(split[0]));

  console.log(decode);
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-3/5 justify-start items-center">
          <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              NFT KARTU PENDUDUK
            </h2>
          </div>
          <div className="flex bg-white w-full overflow-auto">
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
                      value={decode.addressWallet}
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
                        value={decode.nama}
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
                        value={decode.agama}
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
                        value={decode.pekerjaan}
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
                        value={decode.kotaLahir}
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
                          value={decode.tanggalLahir}
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
                        value={decode.jenisKelamin}
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
                        value={decode.golonganDarah}
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
                        value={decode.statusPerkawinan}
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
                        value={decode.kewarganegaraan}
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
                        value={decode.alamat}
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
                        value={decode.rukunTetangga}
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
                        value={decode.rukunWarga}
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
                        name="provinsiKotaLahir"
                        type="text"
                        id="provinsiKotaLahir"
                        placeholder="provinsiKotaLahir"
                        required
                        value={decode.provinsiKotaLahir}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    h-5/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    rounded-lg "
                      />
                    </div>
                    <div className="mb-6 w-full col-span-2">
                      <label
                        for="Kecematan"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kecematan Sekarang
                      </label>
                      <input
                        name="kotaLahir"
                        type="text"
                        id="kotaLahir"
                        placeholder="kotaLahir"
                        value={decode.kotaLahir}
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
                        value={decode.kecamatan}
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
                        value={decode.kelurahan}
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
                      <div className="bg-black w-[22.125rem] h-[29.5rem]"></div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
