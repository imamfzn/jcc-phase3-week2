# Docker Compose

Docker compose merupakan salah satu tools untuk mempermudah menjalankan banyak container. Contohnya pada repository https://github.com/imamfzn/simple-express-crud yang terdiri atas 2 container yaitu api crud dan mongodb. Pada repository tersebut, kita harus melakukan setup pada masing-masing container dan meng-assign setiap container ke dalam network juga volume.

Bayangkan jika container yang ingin kita jalankan jumlahnya cukup banyak dalam ekosistem aplikasi kita. Docker compose sudah otomatis terinstall pada docker destop seperti windows dan mac, namun perlu mendownload binary / instalasi pada os linux. Sehingga pengguna WSL 2 yang sudah menginstall docker-desktop seharusnya sudah memiliki `docker-compose`. Bisa dicek dengan cara:

```powershell
$ docker-compose -v
docker-compose version 1.29.2, build 5becea4c
```

Contoh file `docker-compose` sederhana dapat dilihat di https://github.com/imamfzn/simple-express-crud/blob/master/docker-compose.yml dari repository simple-crud yang sudah kita gunakan sebelumnya. Dengan adanya docker-compose, untuk menjalankan semua container tersebut kita cukup menggunakan 1 perintah saja.

Untuk melakukan build dan menjalankan semua container yang ada kita bisa menggunakan:

```bash
docker-compose up -d
```

Perintah `docker-compose up`, digunakan saat pertama kali service docker-compose tersebut belum pernah dibuat. Apabila sudah pernah dibuat dan tidak ada perubahan sama sekali dama kode aplikasi kita, maka cukup menggunakan perintah:

```bash
docker-compose start
```

Untuk mematikan seluruh container dari project docker-compose kita, bisa menggunakan perintah:

```bash
docker-compose stop
```

Untuk melakukan `destroy` pada project kita bisa menggunakan perintah:

```bash
docker-compose down
```

Perintah `down` tersebut tidak akan menghapus volume yang sudah terbuat. Untuk menghapus volume yang sudah dibuat pada project docker-compose tsb perlu menggunakan argument tambahan `--volume`.


Nama directory tempat file `docker-compose.yml` berada akan menjadi nama default project dari project docker-compose tersebut. Nama project ini bisa di spesifikasikan dengan menambah argument / parameer `-p`.


Selebihnya terkait docker-compose dapat dibaca di https://docs.docker.com/compose/.
