# Day #3: Into into GraphQL

## Materials

GraphQL merupakan salah satu cara mendapatkan data secara dinamis dari sisi client juga server. Dengan adanya graphql, kita tidak perlu membuat banyak endpoint untuk melayani permintaan response yang dinamis dari client. GraphQL tidak semata-mata menggantika REST. GraphQL juga tidak terikat dengan suatu database tertentu / spesifik. Pada dasarnya, yang kita lakukan dengan menggunakan graphql adalah hanyalah menambah satu layer sebelum pengambilan data sebenernya, dan kita menyerahkan kepada graphql untuk memberikan hasil yang dinamis kepada client.

Coba pelajari dasar-dasar dari graphql pada https://graphql.org/learn/ dan ikuti tutorial yang ada pada https://www.freecodecamp.org/news/a-beginners-guide-to-graphql-86f849ce1bec/ agar semakin paham.

## Tasks

### Task #1
1. Pelajari contoh graphql server pada [disini](./graphql-example)
2. Buat graphql server yang baru seperti pada contoh tersebut namun dengan menggunakan databaes sebagai datasource dari setiap resolver
3. Buat graphql server yang baru seperti pada contoh tersebut namun dengan menggunakan api sebagai datasource dari setiap resolver
    1. Terdapat 3 service api yaitu: product service, review service, dan user service

### Task #2

Implementasikan kasus berikut ke dalam bentuk graphql server. Kita akan membuat suatu graphql server terkait event organizer. Silahkan buat dan interpretasikan skema `.graphql` sesuai kasus berikut, dan pastikan bisa menjawab beberapa pertanyaan query yang tertera dibawah.

#### Requirement

- Suatu event dibuat / dikelola oleh suatu organisasi / organizer.
- Suatu event bisa memiliki beberapa tiket
- Seorang user dapat mendaftar ke beberapa tiket yang berbeda di suatu event, tetapi tidak diperkenankan membeli tiket yang sama pada satu event
- Tiket dengan harga `0` menunjukkan tiket gratis
- Setiap tiket memiliki tanggal dan waktu pelaksanaan event
- Setiap user membeli / mendaftarkan diri pada suatu event maka quota tiket yang dibeli akan berkurang. Tiket yang quota nya habis, tidak dapat dibeli.


#### Schema database table / collection

Implementasi database boleh menggunakan MySQL / MongoDB / Postgres. Pastikan skema nya sesuai dengan skema dibawah ini:

```
events {
    id
    name
    organizer_id
}

tickets {
    id
    event_id
    name
    price
    quota
    date
}

user_registered_events {
    user_id
    event_id
    ticket_id
}

organizers {
    id
    name
}

users {
    name
    email
    age
}
```

Ingat, bahwa skema di database tidak pasti sama dengan skema di graphql.

#### Query Requirement

#### Read Query
1. Mendapatkan semua detail event
2. Mendapatkan semua detail event yang gratis
3. Mendapatkan detail event organizer
    1. Mendapatkan total revenue yang didapatkan dari semua event yang dibuat
    2. Mendapatkan event apa saja yang sudah dibuat dan berapa masing-masing revenue dari event tersebut
4. Mendapatkan detail user
    1. Mendapatkan semua event yang pernah didaftarkan
    2. Mendapatkan event yang akan berjalan
    3. Mendapatkan event yang sudah berjalan 
5. Mendapatkan detail ticket
    1. Mendapatkan semua pembeli ticket
6. Mendapatkan semua detail event yang akan datang. Event yang akan datang adalah event yang belum berjalan yang dapat dilihat dari tanggal pada tiket suatu event.
7. Mendapatkan semua detail event yang sudah lewat.

Berikut ini merupakan contoh hasil detail secara dasar dari suatu event

```json
{
   "event": {
        "organizer": {
            ...,
            "totalRevenue"
        },
        "tickets": [
            {
                "buyers": [
                    {
                        ...,
                    }
                ]
            }
        ],
        "participants": [
            {
                ...,
            }
        ],
        "revenue": 0,
    }
}
```

detail user:

```json
{
    "user": {
        ...,

        "registeredEvents": [
            ...
        ],
        "upcomingEvents": [
            ...
        ],
        "pastEvents": [
            ...
        ]
    }
}
```

detail organizer:

```json
{
    "organizer": {
        "events": [
            {
                ...,
                "revenue": ...
            }
        ],
        "totalRevenue": ...
    }
}
```

#### Create / Update Query

1. Create event (name, organizerId)
2. Create organizer (name)
3. Create ticket (eventId, name, price, quota, date)
4. Create user (name, emai, agel)
5. Register event (userId, eventId, ticketId)

