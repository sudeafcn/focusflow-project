# Changelog

Tüm önemli değişiklikler bu dosyada belgelenecektir.

## [1.0.0] - 2026-06-14

### Eklendi (Added)
- Vite + React + TypeScript altyapısı ile proje temeli atıldı.
- Açık/Koyu tema (Dark/Light mode) geçiş sistemi ve CSS değişkenleri (`:root`) eklendi.
- Button, Input, Select, Timer ve TaskList bileşenleri modüler olarak oluşturuldu.
- Semantik HTML yapısına uygun Landing Page (Hero, Özellikler, Fiyatlandırma, SSS) tasarlandı.
- Lighthouse performans raporu (Performans: 99/100) belgelendi.

### Değiştirildi (Changed)
- Proje, Vercel CI/CD süreçlerine uygun olacak şekilde "Git Flow" prensibiyle `dev` branch'inden `main` branch'ine başarıyla aktarıldı (Merge).
- SSS (Accordion) yapısı, Erişilebilirlik (a11y) kuralını maksimize etmek için harici kütüphane yerine yerleşik HTML5 `<details>` ve `<summary>` etiketleriyle baştan yazıldı.

### Düzeltildi (Fixed)
- SCSS derlemesinden kaynaklanan grid yapısındaki sola kayma ve tasarım bozulması sorunu giderildi.
- Vercel build sürecini engelleyen ve projede artık kullanılmayan "Taskform" bileşeninin yarattığı bağımlılık (TypeScript) hataları projeden izole edilerek temizlendi. Canlıya alma (deployment) sorunsuz tamamlandı.