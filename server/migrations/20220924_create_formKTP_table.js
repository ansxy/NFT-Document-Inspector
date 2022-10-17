const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("form_ktp", {
      address_wallet: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan address wallet anda!",
          },
          len: {
            args: [42, 42],
            msg: "panjang address wallet salah!",
          },
        },
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan nama anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      kota_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan kota kelahiran anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      provinsi_kota_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan provinsi dari kota kelahiran anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan provinsi tanggal lahir anda!",
          },
        },
      },
      jenis_kelamin: {
        type: DataTypes.ENUM("LAKI-LAKI", "PEREMPUAN"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan jenis kelamin anda!",
          },
        },
      },
      status_perkawinan: {
        type: DataTypes.ENUM(
          "BELUM KAWIN",
          "KAWIN",
          "CERAI HIDUP",
          "CERAI MATI"
        ),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan jenis kelamin anda!",
          },
        },
      },
      golongan_darah: {
        type: DataTypes.ENUM("A", "B", "O", "AB", "-"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan golongan darah anda!",
          },
        },
      },
      kewarganegaraan: {
        type: DataTypes.ENUM("WNI", "WNA"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan status kewarganegaraan anda!",
          },
        },
      },
      pekerjaan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan status pekerjaan anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      agama: {
        type: DataTypes.ENUM(
          "ISLAM",
          "KRISTEN",
          "KATHOLIK",
          "HINDU",
          "BUDDHA",
          "KONGHUCU"
        ),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan agama anda!",
          },
        },
      },
      // dari sistem
      berlaku_hingga: {
        type: DataTypes.ENUM("SEUMUR HIDUP"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan status berlaku  anda!",
          },
        },
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan alamat tempat tinggal anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      rukun_tetangga: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan nomor RT tempat tinggal anda!",
          },
          len: {
            args: [3, 3],
            msg: "nomor RT panjangnya harus 3 digit!",
          },
        },
      },
      rukun_warga: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan nomor RW tempat tinggal anda!",
          },
          len: {
            args: [3, 3],
            msg: "nomor RW panjangnya harus 3 digit!",
          },
        },
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan kelurahan tempat tinggal anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      //feat: menambahkan id kecamatan
      id_kecamatan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan id kecamatan!",
          },
        },
      },
      kecamatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan kecamatan tempat tinggal anda!",
          },
          isUppercase: {
            msg: "Masukkan data berupa huruf kapital!",
          },
        },
      },
      // dari sistem
      // kota_ktp_dibuat: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: {
      //       msg: "Tolong masukkan kota KTP ini dibuat!",
      //     },
      //     isUppercase: {
      //       msg: "Masukkan data berupa huruf kapital!",
      //     },
      //   },
      // },
      // dari sistem
      // provinsi_ktp_dibuat: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: {
      //       msg: "Tolong masukkan provinsi KTP ini dibuat!",
      //     },
      //     isUppercase: {
      //       msg: "Masukkan data berupa huruf kapital!",
      //     },
      //   },
      // },
      // dari sistem
      status_validasi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan status validasi KTP ini!",
          },
        },
      },
      nama_file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan nama file foto!",
          },
        },
      },
      tipe_mime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan format file dari foto!",
          },
        },
      },
      ukuran: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tolong masukkan ukuran file foto!",
          },
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("form_ktp");
  },
};
