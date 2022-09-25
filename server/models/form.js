const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class FormKtp extends Model { }

FormKtp.init({
  addressWallet: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan address wallet anda!',
      },
      len: {
        args: [42, 42],
        msg: 'panjang address wallet salah!',
      },
    },
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan nama anda!',
      },
      isUppercase: {

        msg: 'Masukkan data berupa huruf kapital!',
      },
    },
  },
  kotaLahir: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan kota kelahiran anda!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      },
    },
  },
  provinsiKotaLahir: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan provinsi dari kota kelahiran anda!',
      },
      isUppercase: {

        msg: 'Masukkan data berupa huruf kapital!',
      },
    },
  },
  tanggalLahir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: {

        msg: 'Tolong masukkan provinsi tanggal lahir anda!',
      },
    },
  },
  jenisKelamin: {
    type: DataTypes.ENUM('LAKI-LAKI', 'PEREMPUAN'),
    allowNull: false,
    validate: {
      notNull: {

        msg: 'Tolong masukkan jenis kelamin anda!',
      },
    },
  },
  statusPerkawinan: {
    type: DataTypes.ENUM('BELUM KAWIN', 'KAWIN', 'CERAI HIDUP', 'CERAI MATI'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan jenis kelamin anda!',
      },
    },
  },
  golonganDarah: {
    type: DataTypes.ENUM('A', 'B', 'O', 'AB', '-'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan golongan darah anda!',
      },
    },
  },
  kewarganegaraan: {
    type: DataTypes.ENUM('WNI', 'WNA',),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan status kewarganegaraan anda!',
      },
    },
  },
  pekerjaan: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan status pekerjaan anda!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      }
    },
  },
  agama: {
    type: DataTypes.ENUM('ISLAM', 'KRISTEN', 'KATHOLIK', 'HINDU', 'BUDDHA', 'KONGHUCU'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan agama anda!',
      },
    },
  },
  // dari sistem
  berlakuHingga: {
    type: DataTypes.ENUM('SEUMUR HIDUP'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan status berlaku  anda!',
      },
    },
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan alamat tempat tinggal anda!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      }
    },
  },
  rukunTetangga: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan nomor RT tempat tinggal anda!',
      },
      len: {
        args: [3, 3],
        msg: 'nomor RT panjangnya harus 3 digit!',
      },
    },
  },
  rukunWarga: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan nomor RW tempat tinggal anda!',
      },
      len: {
        args: [3, 3],
        msg: 'nomor RW panjangnya harus 3 digit!',
      },
    },
  },
  kelurahan: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan kelurahan tempat tinggal anda!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      }
    },
  },
  kecamatan: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan kecamatan tempat tinggal anda!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      }
    },
  },
  // dari sistem
  kotaKtpDibuat: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan kota KTP ini dibuat!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      }
    },
  },
  // dari sistem
  provinsiKtpDibuat: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan provinsi KTP ini dibuat!',
      },
      isUppercase: {
        msg: 'Masukkan data berupa huruf kapital!',
      }
    },
  },
  // dari sistem
  statusValidasi: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan status validasi KTP ini!',
      },
    },
  },
  namaFile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan nama file foto!',
      },
    },
  },
  tipeMime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan format file dari foto!',
      },
    },
  },
  ukuran: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tolong masukkan ukuran file foto!',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'form_ktp',
  freezeTableName: true,
});

module.exports = FormKtp;