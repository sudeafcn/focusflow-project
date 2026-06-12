import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Select } from './components/select/Select';

function App() {
  const kategoriSeçenekleri = [
    { value: 'is', label: '💻 İş / Yazılım' },
    { value: 'kisisel', label: '🏠 Kişisel' },
    { value: 'saglik', label: '🍏 Sağlık / Spor' },
  ];

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>FocusFlow Bileşen Test Alanı</h1>
      
      <div style={{ margin: '30px 0' }}>
        {/* Input */}
        <Input 
          label="Görev Başlığı" 
          placeholder="Örn: TypeScript Refactor Yap" 
        />

        {/* Yeni Eklediğimiz Select */}
        <Select 
          label="Görev Kategorisi" 
          options={kategoriSeçenekleri} 
        />
      </div>

      {/* Butonlar */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button variant="primary" size="md">Görevi Kaydet</Button>
        <Button variant="secondary" size="md">İptal Et</Button>
      </div>
    </div>
  );
}

export default App;