# Day #1: Docker 101

## Setup Preparation

### Setup Visual Studio Code

Untuk mempermudah sesi kali ini, silahkan install Visual Studio Code di laptop kalian https://code.visualstudio.com/ apabila belum terinstall.

### Setup WSL 2

Harapannya kalian sudah memiliki / menginstall wsl 2 di laptop masing-masing. Namun apabila belum bisa mengikuti beberapa step dibawah ini. Kalian bisa skip tahap ini jika wsl 2 sudah terinstall. Cara memeriksanya bisa dengan cara:

1. Buka command prompt / power shell
2. Masukkan perintah:
    ```powershell
    wsl -l -v
    ```
3. Apabila output dari perintah tersebut seperti dibawah ini, maka laptop kalian sudah terinstall wsl 2
    ```powershell
    PS C:\Users\Imam> wsl -l -v
      NAME                   STATE           VERSION
    * Ubuntu                 Stopped         2
    PS C:\Users\Imam>
   ```

Apabila belum terinstall, silahkan ikuti tutorial pada artitkel berikut https://docs.microsoft.com/en-us/windows/wsl/install#install. Setelah melakukan install wsl2, jangan lupa untuk restart laptop kalian. Good Luck!.


### Setup Docker Desktop

1. Download installer [Docker Desktop](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)
2. Install dengan manjalankan file `.exe` hasil download dari link sebelumnya
3. Ikuti perintah yang tertera pada installer hingga selesai
4. Setelah instalasi selesai, biasanya kalian diminta untuk melakukan `logout` dari windows, lakukan logout dan masuk kembali ke windows
5. Setelah masuk ke windows, jalankan Docker Desktop (dari desktop / start menu)
6. Di awal setelah install, biasanya ini akan ada loading yang tidak sebentar, tunggu saja.
7. Setelah window Docker terbuka, pilih `Settings > General`
![Docker desktop settings](https://docs.docker.com/desktop/windows/images/wsl2-enable.png)
8. Centang checkbox `Use WSL 2 based engine`
9. Pilih Tab `Resources` pada sebelah kiri menu, dan pilih menu `WSL Integration` centang `Enable integration with my default WSL distro`, dan toggle-on distron WSL 2 kalian
![WSL Integration](./img/docker-setting-resource-wsl2-intagration.png)
10. Clik `Apply & Restart`
11. Kembali ke menu utama dengan klik tombol cancel pada kanan bawah menu
12. Pastikan kalian kembali ke menu / tampilan utama Docker Desktop
![Main Docker Desktop](./img/docker-desktop-main-menu.png)

Pada tahap ini, Docker Desktop seharusnya sudah terinstall di laptop kalian. Untuk memastikan lebih lanjut, kita akan mencoba menjalankan sebuah container dengan docker command yang tertera pada menu utama.

```bash
docker run -d -p 80:80 docker/getting-started
````

Jalankan perintah tersebut pada **command prompt WSL 2** kalian, kalian bisa masuk ke prompt WSL 2 dengan cara:
1. Buka powershell
2. Jalankan perintah:
    ```powershell
    wsl ~
    ```
3. Jalankan perintah docker untuk menjalankan docker container:
    ```bash
    docker run -d -p 80:80 docker/getting-started
    ```
4. Kurang lebih akan ada output seperti dibawah ini pada console kalian:
    ```bash
    imamfzn@DESKTOP-PB3CQQ3:~$ docker run -d -p 80:80 docker/getting-started
    Unable to find image 'docker/getting-started:latest' locally
    latest: Pulling from docker/getting-started
    97518928ae5f: Pull complete
    a4e156412037: Pull complete
    e0bae2ade5ec: Pull complete
    3f3577460f48: Pull complete
    e362c27513c3: Pull complete
    a2402c2da473: Pull complete
    eb65930377cd: Pull complete
    69465e074227: Pull complete
    Digest: sha256:86093b75a06bf74e3d2125edb77689c8eecf8ed0cb3946573a24a6f71e88cf80
    Status: Downloaded newer image for docker/getting-started:latest
    e83e2cd26a75df3777a21aed8b793bd0d315c52d710e27939496bbf397c006e8
    ````
5. Buka browser kalian, coba akses `http://localhost` dan seharusnya akan muncul halaman `Getting Stated Docker` seperti gambar dibawah ini
![Docker Getting Started from localhost](./img/docker-run-getting-started.png)

Selamat, kalian sudah berhasil menginstall docker pada laptop kalian :tada:

## Introduction

### Virtual Machine & Container

Dengan adaya teknologi virtualisasi machine, kita dapat membagi resource suatu physical machine / dedicated server menjadi beberapa resource machine yang disebut dengan virtual machine (vm). Misal kita memiliki suatu physical machine / dedicated server / bahkan komputer yang kita pakai dengan spesifikasi: RAM 32GB: CPU: 8Core, HDD: 500GB. Dengan spesifikasi tersebut, kita bisa membuat beberapa virtual machine yang berjalan diatas mesin asli tersebut (biasa disebut dengan `host machine`). Misalnya menjadi:

```bash
VM1: Windows 10, RAM 8GB, CPU 2Core, HDD 100GB
VM2: Ubuntu 16, RAM 8GB, CPU 4CORE, HDD 300GB
VM3: Debian 9, RAM 4GB, CPU 2 Core, HDD 100GB
````

![VM vs Non VM](./img/vm-vs-non-vm.png "https://www.researchgate.net/figure/Non-virtual-machine-and-VM-configurations-Source-https-softwareintelcom_fig1_323184080")

Virtual machine tersebut juga dapat dengan mudah & dinamis diubah spesifikasinya sesuai ketersediaan resource pada host machine dan kebutuhan. Selama ini, biasanya `Server` yang kita bayar untuk menginstall aplikasi kita dari provider infrastruktur seperti Amazon, Google Cloud, Digital Ocean sebenarnya adalah dalam bentuk virtual machine. Contohnya layanan [Amazon EC 2 Instance](https://aws.amazon.com/ec2/instance-types/) yang mungkin teman-teman juga pernah menggunakan nya.

Jadi dengan adanya virtual machine:
- Lebih murah dibanding membeli dedicated server / physical machine secara langsung
- Pengelolaan hardware sudah di-abstraksi

Lalu misalnya kita memiliki banyak aplikasi yang harus berjalan di suatu server. Tetapi, masing-masing dari aplikasi tersebut memiliki dependensi yang berbeda-beda. Misalnya:

```bash
app-a: harus berjalan pada sistem operasi linux debian
app-b: harus berjalan pada sistem operasi windows
app-c: harus berjalan pada sistem operasi linux debian pada versi x
app-d: harus berjalan pada sistem operasi linux centos pada versi y
````

Kasus lainnya bisa jadi setiap aplikasi memiliki dependensi sistem operasi yang sama, namun dependensi interpreter aplikasi nya berbeda, misal:

```bash
app-a: harus menggunakan nodejs versi 12
app-b: harus menggunakan nodejs versi 14
app-c: harus menggunakan nodejs versi 10
```

Kasus lainnya lagi, ternyata kebutuhan interpreter dari aplikasi-aplikasi kita tidak berbeda satu sama lain. Contohnya semua aplikasi yang kita miliki sama-sama menggunakan versi nodejs yang sama. Namun karena suatu kepentingan ada hal yang ingin dicapai, misal:

```bash
app-a: tidak boleh ada aplikasi yang bisa mengakses port / disk app-a
app-b: hanya app-a yang boleh mengakses port app-b
app-c: hanya app-b yang boleh mengakses disk app-b
```

Dengan adanya kasus tersebut tentu kita tidak bisa menginstall aplikasi-aplikasi kita di dalam 1 sistem operasi begitu saja baik itu pada 1 dedicated server / 1 virtual machine. Kasus ini biasa dinamakan dengan **Application Isolation**. Bagaimana jika kita ingin melakukan isolasi beberapa aplikasi yang kita miliki dengan vm ? Mudahnya kita bisa melakukan nya dengan membuat model 1 vm 1 aplikasi. Namun dengan model ini, tentunya cost menjadi beberapa kali lipat karena kita perlu membeli / membayar vm tambahan untuk masing-masing aplikasi kita. Lalu kita perlu ada effort untuk melakukan setup / instalasi vm dari awal lagi. Oleh karena itu, muncullah konsep bernama **Container**.

![Baremetal vs VM vs Container](./img/containers-vm-bare-metal.png "https://thymos.engineering/blog/kubernetes-containers-cloud-native-the-basics")

Container digunakan untuk melakukan isolasi aplikasi yang berjalan pada suatu sistem operasi. Dengan adanya container, kita tidak perlu melakukan setup virtual machine seperti instalasi os dari awal. Container lebih murah, dan waktu startup nya lebih cepat dibanding vm. Salah satu teknologi container yang saat ini ramai digunakan adalah **Docker**.


### Docker

Docker merupakan salah satu teknologi container.



## Docker Components
...


### Docker Registry
...

### Docker Image
...


### Docker Container
...

### Docker Volume
...

### Docker Network
...



