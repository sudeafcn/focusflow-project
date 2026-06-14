# ⚡ FocusFlow AI - Yapay Zeka Destekli Zaman Yönetimi platformu

FocusFlow AI; kullanıcıların çalışma alışkanlıklarını analiz eden, görevlerin bilişsel yüküne göre ideal Pomodoro seanslarını tahmin eden ve işleri öncelik sırasına koyarak derin odaklanma (Deep Work) sağlayan kurumsal seviyede bir **Zaman Yönetimi ve Landing Page (Ürün Tanıtım) platformudur**. 

Bu proje, esnek bileşen mimarisi (UI Library), gelişmiş state yönetimi ve kullanıcı deneyimi (UX) standartları göz önünde bulundurularak hibrit bir yapıda geliştirilmiştir.

---

## 🚀 Çekirdek Özellikler

- **🧠 Öngörülü Yapay Zeka Analitiği:** Girilen görevin karmaşıklığını ve kategorisini inceleyerek tamamlanması gereken ideal Pomodoro seans sayısını otomatik hesaplar.
- **📊 Öncelik Tabanlı Akıllı Sıralama:** Görevler "Yüksek, Orta, Düşük" öncelik seviyelerine göre gerçek zamanlı olarak akıllı bir sıralama algoritmasıyla dizilir. Acil işler her zaman en üstte yer alır.
- **⏱️ Çift Modlu Entegre Sayaç:** Çalışma seansı (25 dk) ve Mola seansı (5 dk) geçişlerini otomatik yönetir. Sayaç, aktif olarak odaklanılan göreve bağlanır.
- **🔄 Görev Odaklı Dinamik Güncelleme:** Bir Pomodoro seansı başarıyla tamamlandığında, odaklanılan görevin kalan seans sayısı otomatik olarak düşürülür. Görevler tek tıkla "Tamamlandı" olarak işaretlenebilir.
- **💼 Esnek Onboarding & Dönüşüm Hunisi:** Bireysel kullanıcılar için düşük sürtünmeli kayıt alanı sunarken, "Enterprise (Takım)" planı için şirkete özel kişi sayısı ve departman bilgisi alan dinamik bir kurumsal veri toplama modalı barındırır.
- **🌙 Akıllı Tema Motoru:** Gece ve gündüz çalışma dinamiklerine tam uyumlu, göz yorgunluğunu sıfırlayan Işık/Karanlık mod desteği.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Framework / Runtime:** React v18, Vite
- **Dil:** TypeScript (Sıkı Tip Güvenliği)
- **Stil Yönetimi:** Sass / SCSS (Modüler ve Responsive Mimari)
- **Paket Yönetimi:** NPM

---

## 📅 Gün Gün Geliştirme Süreci (Sprint Log)

### 🔹 1. Gün: Altyapı ve Atomik UI Bileşenlerinin Kurulması
- Vite mimarisi üzerinde TypeScript ve React projesi ayağa kaldırıldı.
- Sıkı tip güvenliğine sahip atomik bileşenler (`Button`, `Input`, `Select`) geliştirildi.
- Projenin renk paleti, Işık/Karanlık mod değişkenleri (`CSS Variables`) `index.css` üzerinde tanımlanarak tema altyapısı hazırlandı.

### 🔹 2. Gün: Kurumsal Landing Page Tasarımı ve Metrik Entegrasyonu
- Şık ve modern bir Hero alanı, düşük sürtünmeli kullanıcı kayıt formu tasarlandı.
- Ürünün sosyal kanıtını güçlendirmek amacıyla performans ve kullanıcı istatistiklerini içeren **Metrics Bar** arayüze eklendi.
- 3 farklı iş modeline uygun fiyatlandırma kartları (`Starter`, `FocusPro`, `Enterprise`) kurumsal SaaS standartlarında geliştirildi.

### 🔹 3. Gün: Çekirdek Görev ve Zaman Yönetimi Altyapısı
- Görev ekleme, silme ve durum güncelleme dinamikleri için gerekli React state yapıları kuruldu.
- Görevlerin durumuna göre (`isCompleted`) arayüzde görsel olarak biçimlendirilmesini (üstünün çizilmesi, opaklık ayarı) sağlayan mantıksal süreçler tamamlandı.

### 🔹 4. Gün: 6 Kategorili AI Motoru ve Akıllı Sıralama Algoritması
- İş dünyasından popüler 6 gelişmiş kategori (Yazılım, Akademi, Finans, Pazarlama, Strateji, Kişisel Gelişim) sisteme entegre edildi.
- Görevlerin önem derecesine göre otomatik olarak yukarıda listelenmesini sağlayan **Öncelik Tabanlı Sıralama Algoritması** kodlandı.
- `Timer` bileşeni, aktif görevi tanıyacak ve çalışma bittiğinde o görevden otomatik seans düşecek şekilde optimize edildi. 5 dakikalık mola fonksiyonu entegre edildi.
- Enterprise (Takım) planı için kişi sayısı ve departman alan kurumsal lead toplama modalı ile bireysel planlar için model hassasiyet kalibrasyonu modalları optimize edildi.
- Sass derleme pürüzleri giderildi ve proje sıfır hata ile üretime hazır hale getirildi.

---

## 📦 Kurulum ve Çalıştırma

1. Proje bağımlılıklarını yükleyin:
```bash
npm install 
```

2. Projeyi lokal sunucuda başlatın:
```bash
npm run dev
```

