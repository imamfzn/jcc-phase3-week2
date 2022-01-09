# Day #1: Docker 101

## Material

Silahkan lakukan setup dan baca materi berikut ini secara berurutan:

1. [Setup Preparation (vs-code, wsl2, docker-desktop)](./setup-preparation.md)
2. [Introduction Into Container](./introduction.md)
3. [Docker](./docker.md)


## Hands On Task:

1. Silahkan download / clone repository https://github.com/imamfzn/simple-express-starter ke directory di dalam wsl 2 kalian
2. Jalankan aplikasi tersebut tanpa menggunakan docker (lihat README aplikasi pada repository)
3. Jalankan aplikasi tersebut dengan menggunakan docker
4. Hit endpoint yang tersedia pada aplikasi tersebut `/` dan `/test`
5. Amati log aplikasi melalui `docker logs`
6. Coba jalankan aplikasi tersebut dengan docker dan ganti port yang di publish ke localhost kita menjadi port 4045 dan pastikan endpoint sebelumnya dapat diakses


## Notes

1. Selalu gunakan console wsl 2 setiap menjalankan perintah docker, pastikan `powershell` / `command prompt` kalian sudah masuk ke mode wsl.

   ```powershell
   wsl ~
   ```

2. Jika ada yang belum dipahami, silahkan catat dan jangan lupa untuk ditanyakan pada live-session malam nanti.
