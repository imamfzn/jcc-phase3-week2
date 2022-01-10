# Hands On Tasks

## Running a Simple Express Application

1. Silahkan download / clone repository https://github.com/imamfzn/simple-express-starter ke directory di dalam wsl 2 kalian
2. Jalankan aplikasi tersebut tanpa menggunakan docker (lihat README aplikasi pada repository)
3. Jalankan aplikasi tersebut dengan menggunakan docker
4. Hit endpoint yang tersedia pada aplikasi tersebut `/` dan `/test`
5. Amati log aplikasi melalui `docker logs`
6. Coba jalankan aplikasi tersebut dengan docker dan ganti port yang di publish ke localhost kita menjadi port `4040` dan pastikan endpoint sebelumnya dapat diakses


Silahkan baca kembali materi [Docker](./docker.md) sebelumnya untuk membantu memahami dan mengerjakan task ini.


## Modify & Running a Simple Crud Application

Pada task ini aplikasi yang akan kita build dan jalankan adalah aplikasi crud sederhana dengan menggunakan database mongodb dari sebuah docker container. Aplikasi tersebut belum memiliki `Dockerfile`, silahkan bikin `Dockerfile` agar aplikasi tersebut dapat di build dan dijalankan. Kalian juga perlu membaca code aplikasi tersebut (`app.js`) untuk membantu kalian membuat `Dockerfile`.

1. Silahkan download / clone repository https://github.com/imamfzn/simple-express-crud ke directory di dalam wsl 2 kalian
2. Ikut petunjuk yang ada pada README repository tersebut
3. Ubah beberapa varible yang ada pada README menjadi:
   - `<your_volume_name>` : jcc-vol-01
   - `<your_network_name>`: jcc-netw-01
   - `<your_user`: root
   - `<your_password>`: root
   - `<your_mongo_container_name>`: jcc-mongo-01
   - `<IMAGE_NAME>`: jcc-app-crud:0.1.0
   - `<PUBLISH_PORT>`: diisi terserah
   - `<EXPOSED_PORT>`: sesuaikan dengan aplikasi & dockerfile

4. Build image dengan dockerfile yang sudah kalian buat
5. Jalankan container dengan image yang sudah di build dengan mengikuti petunjuk pada halaman README repository aplikasi
6. Coba lakukan hit pada `POST /users` untuk membuat sebuah user
7. Periksa user yang dibuat pada endpoint `GET /users`

Apabila aplikasi sudah berhasil berjalan, **stop & hapus** container yang sedang berjalan. Lalu, untuk menambah pemahaman coba modifikasi aplikasi tersebut untuk menambah endpoint:
* `GET /users/:id` untuk mengambil user berdasarkan `_id` yang sudah terbentuk
* `DELETE /users/:id` untuk menghapus user berdasarkan `_id` yang sudah terbentuk

Build ulang image tersebut dengan mengubah tag / versi image dari `0.1.0` menjadi `0.2.0`. Jalankan kembali container dan lakukan test terhadap endpoint yang baru ditambahkan.
