import { useState } from 'react';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Select } from './components/Select/Select';
import Timer from './components/Timer/Timer';
import { TaskList, type Task } from './components/tasklist/TaskList';
import './App.scss';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Landing Form
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // === AI GÖREV YÖNETİCİSİ STATE'LERİ ===
  const [aiTaskName, setAiTaskName] = useState('');
  const [aiCategory, setAiCategory] = useState('yazilim');
  const [aiPriority, setAiPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [aiResult, setAiResult] = useState<{ duration: number; efficiencyScore: number; advice: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(''); setFormSuccess(false);
    if (!name.trim() || !email.trim()) { setFormError('Lütfen tüm alanları doldurunuz.'); return; }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Geçerli bir e-posta adresi giriniz.'); return;
    }

    setFormSuccess(true); 
    setSelectedPlan('Erken Erişim / Ücretsiz Deneme');
    setIsModalOpen(true);
  };

  const openPlanModal = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  // 6 KATEGORİLİ EKSİKSİZ AI FONKSİYONU
  const handleAiAnalysisAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTaskName.trim()) return;

    setIsAnalyzing(true);
    setAiResult(null);

    setTimeout(() => {
      let pomodoros = 2;
      let efficiencyScore = 92;
      let advice = 'Görev doğasına uygun optimal bir planlama yapıldı.';

      switch (aiCategory) {
        case 'yazilim': pomodoros = 3; efficiencyScore = 88; advice = 'Yüksek bilişsel yük gerektirir. Derin odaklanma evresine geçeceksiniz.'; break;
        case 'akademik': pomodoros = 2; efficiencyScore = 95; advice = 'Ezber ve analiz dengeli dağılmalı. Öğleden önce tamamlamak idealdir.'; break;
        case 'finans': pomodoros = 2; efficiencyScore = 91; advice = 'Yüksek dikkat gerektirir. Her seans sonunda gözlerinizi dinlendirin.'; break;
        case 'pazarlama': pomodoros = 1; efficiencyScore = 89; advice = 'Yaratıcı ve operasyonel geçişler yoğun. Hızlıca aksiyona geçin.'; break;
        case 'strateji': pomodoros = 4; efficiencyScore = 85; advice = 'Makro planlama içerir. Bloklar arası uzun molalar verin.'; break;
        case 'kisisel': pomodoros = 1; efficiencyScore = 90; advice = 'Rutinlerinizi bozmadan, istikrarlı ilerleme kaydetmek için harika bir süreç.'; break;
      }

      if (aiPriority === 'high') { 
        pomodoros += 1; 
        advice += ' (Yüksek öncelikli görev olduğu için süre esnek tutuldu).'; 
      }

      const newTask: Task = {
        id: Date.now().toString(),
        title: aiTaskName,
        category: aiCategory,
        priority: aiPriority,
        pomodoros: pomodoros,
        isCompleted: false
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setAiResult({ duration: pomodoros * 25, efficiencyScore, advice });
      setAiTaskName('');
      setIsAnalyzing(false);
    }, 1200);
  };

  const getSortedTasks = () => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    return [...tasks].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });
  };

// --- TIMER VE GÖREV SENKRONİZASYON KODLARI ---
  // Listede henüz tamamlanmamış (isCompleted: false) ilk görevi hedef al
  const activeTask = tasks.find(task => !task.isCompleted) || tasks[0] || null; 
  const currentSessions = activeTask ? activeTask.pomodoros : 0;

  // Süre bittiğinde o görevin seans sayısını otomatik 1 azaltan fonksiyon
  const handleSessionComplete = () => {
    if (!activeTask) return;
    setTasks((prevTasks) => prevTasks.map(task => {
      if (task.id === activeTask.id && task.pomodoros > 0) {
        return { ...task, pomodoros: task.pomodoros - 1 };
      }
      return task;
    }));
  };
  // ---------------------------------------------
  // ---------------------------------------------
  return (
    <div className="ff-landing-page">
      {/* NAVBAR */}
      <nav className="ff-navbar">
        <div className="ff-nav-logo">⚡ FocusFlow <span className="ff-logo-badge">AI</span></div>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>{theme === 'light' ? '🌙 Karanlık Mod' : '☀️ Işık Modu'}</Button>
      </nav>

      {/* HERO ALANI */}
      <header className="ff-hero-section">
        <div className="ff-hero-badge">Yapay Zeka Destekli Yeni Nesil Zaman Yönetimi</div>
        <h1 className="ff-hero-title">Dikkati Dağıtan Her Şeyi Susturun. FocusFlow AI ile Akışta Kalın.</h1>
        <p className="ff-hero-subtitle">Çalışma alışkanlıklarınızı analiz eder, görevlerinizin süresini tahmin eder ve size en uygun odaklanma takvimini çıkarır.</p>
        
        <div className="ff-hero-form-container">
          <form onSubmit={handleFormSubmit} className="ff-hero-form">
            <Input placeholder="Adınız" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="E-posta Adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="primary" size="md" type="submit">Hemen Ücretsiz Başla</Button>
          </form>
          {formError && <div className="ff-form-error" role="alert">⚠️ {formError}</div>}
          {formSuccess && <div style={{ color: 'var(--color-success)', fontSize: '0.9rem', marginTop: '12px', fontWeight: 'bold' }}>🎉 Harika! Sisteme başarıyla dahil oldunuz.</div>}
        </div>
      </header>

      {/* METRİKLER */}
      <section className="ff-metrics-bar">
        <div className="ff-metric-item"><strong>14,200+</strong> <span>Aktif Kullanıcı</span></div>
        <div className="ff-metric-item"><strong>3.8M+</strong> <span>Odaklanılmış Dakika</span></div>
        <div className="ff-metric-item"><strong>%94.6</strong> <span>Kullanıcı Memnuniyeti</span></div>
        <div className="ff-metric-item"><strong>98/100</strong> <span>Lighthouse Skoru</span></div>
      </section>

      {/* BİLGİ KARTLARI */}
      <section className="ff-features-section">
        <h2 className="ff-section-title">Akıllı Çekirdek Özellikler</h2>
        <div className="ff-features-grid">
          <div className="ff-native-card">
            <div className="ff-card-icon">🧠</div>
            <h3>Öngörülü Zaman Analitiği</h3>
            <p>Yapay zeka, yazdığınız görevin içeriğini analiz ederek tamamlanması için gereken ideal Pomodoro seansını tahmin eder.</p>
          </div>
          <div className="ff-native-card">
            <div className="ff-card-icon">📈</div>
            <h3>Biyolojik Ritim Optimizasyonu</h3>
            <p>En zorlu görevleri verimliliğinizin zirvede olduğu saatlere planlayarak tükenmişlik sendromunu engeller.</p>
          </div>
          <div className="ff-native-card">
            <div className="ff-card-icon">🎨</div>
            <h3>Akıllı Uyarlanabilir Arayüz</h3>
            <p>Gece ve gündüz çalışma dinamiklerine tam uyumlu, göz yorgunluğunu sıfırlayan akıcı mikromimari.</p>
          </div>
        </div>
      </section>

      {/* YAPAY ZEKA ÇALIŞMA ALANI */}
      <section className="ff-workspace-section">
        <div className="ff-workspace-header">
          <span className="ff-workspace-badge">Canlı Deneyim</span>
          <h2 className="ff-section-title" style={{ marginTop: '10px' }}>Yapay Zeka Destekli Çalışma Alanı</h2>
        </div>

        <div className="ff-workspace-container">
          <div className="ff-workspace-top">
            
            <div className="ff-workspace-form-wrapper">
              <form onSubmit={handleAiAnalysisAndAdd} className="ff-ai-add-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Input label="Göreviniz / Projeniz" placeholder="Örn: Rapor dökümantasyonu..." value={aiTaskName} onChange={(e) => setAiTaskName(e.target.value)} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <Select 
                      label="Kategori"
                      options={[
                        { value: 'yazilim', label: '💻 Mühendislik & Kodlama' },
                        { value: 'akademik', label: '📚 Araştırma & Akademi' },
                        { value: 'finans', label: '📊 Finansal Analiz & Raporlama' },
                        { value: 'pazarlama', label: '📣 Dijital Pazarlama & İçerik' },
                        { value: 'strateji', label: '🚀 Girişimcilik & Strateji' },
                        { value: 'kisisel', label: '🌱 Rutinler & Kişisel Gelişim' }
                      ]}
                      value={aiCategory} onChange={(e) => setAiCategory(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Select 
                      label="Öncelik"
                      options={[{ value: 'high', label: '🔥 Yüksek' }, { value: 'medium', label: '⚡ Orta' }, { value: 'low', label: '🧊 Düşük' }]}
                      value={aiPriority} onChange={(e) => setAiPriority(e.target.value as any)}
                    />
                  </div>
                </div>
                <Button variant="primary" size="md" type="submit" disabled={isAnalyzing || !aiTaskName.trim()}>
                  {isAnalyzing ? 'Hesaplanıyor...' : '🧠 Analiz Et ve Akışa Ekle'}
                </Button>
              </form>

              {aiResult && (
                <div className="ff-ai-result-card" style={{ marginTop: '16px' }}>
                  <p className="ff-ai-advice"><strong>AI Tavsiyesi:</strong> {aiResult.advice}</p>
                </div>
              )}
            </div>

            <div className="ff-workspace-timer-wrapper">
<Timer 
  sessionsLeft={currentSessions} 
  onSessionComplete={handleSessionComplete} 
/>            </div>

          </div>

          <div className="ff-workspace-bottom">
            <TaskList 
              tasks={getSortedTasks()} 
              activeTaskId={activeTaskId}
              onSelectActiveTask={(id) => setActiveTaskId(id)}
              onDeleteTask={(id) => setTasks(prev => prev.filter(t => t.id !== id))} 
              onToggleComplete={(id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))} 
            />
          </div>
        </div>
      </section>

      {/* FİYATLANDIRMA KARTLARI */}
      <section className="ff-pricing-section">
        <h2 className="ff-section-title">Esnek ve Şeffaf Planlar</h2>
        <div className="ff-pricing-grid">
          <div className="ff-native-card">
            <h3>Starter (Ücretsiz)</h3>
            <div className="ff-price-tag">0 TL <span>/ ömür boyu</span></div>
            <ul className="ff-price-features">
              <li>✓ Günlük 5 Yapay Zeka Analizi</li>
              <li>✓ Standart Pomodoro Sayacı</li>
              <li>✓ Tarayıcı Tabanlı Veri Saklama</li>
            </ul>
            <Button variant="secondary" size="md" onClick={() => openPlanModal('Starter (Ücretsiz)')}>Planı Seç</Button>
          </div>

          <div className="ff-native-card popular">
            <span className="ff-card-badge">En Popüler</span>
            <h3>FocusPro (Premium)</h3>
            <div className="ff-price-tag">149 TL <span>/ aylık</span></div>
            <ul className="ff-price-features">
              <li>✓ Sınırsız Yapay Zeka Analizi</li>
              <li>✓ Biyolojik Ritim Optimizasyonu</li>
              <li>✓ Güvenli Bulut Senkronizasyonu</li>
            </ul>
            <Button variant="primary" size="md" onClick={() => openPlanModal('FocusPro (Premium)')}>Hemen Pro'ya Geç</Button>
          </div>

          <div className="ff-native-card">
            <h3>Enterprise (Takım)</h3>
            <div className="ff-price-tag">499 TL <span>/ aylık</span></div>
            <ul className="ff-price-features">
              <li>✓ 15 Kullanıcıya Kadar Destek</li>
              <li>✓ Ortak Takım Odaklanma Odaları</li>
              <li>✓ Departman Bazlı Analiz</li>
            </ul>
            <Button variant="secondary" size="md" onClick={() => openPlanModal('Enterprise (Takım)')}>Takımı Kaydet</Button>
          </div>
        </div>
      </section>

      {/* SIKÇA SORULAN SORULAR */}
      <section className="ff-faq-section">
        <h2 className="ff-section-title">Sıkça Sorulan Sorular</h2>
        <div className="ff-faq-list">
          <details className="ff-faq-item">
            <summary>🤖 FocusFlow Yapay Zekası odağımı nasıl tahmin ediyor?</summary>
            <p>Geçmiş çalışma alışkanlıklarınızı makine öğrenmesi algoritmalarıyla analiz ederek size özel bir verimlilik skoru üretir.</p>
          </details>
          <details className="ff-faq-item">
            <summary>📊 Tahmini Pomodoro seansı neye göre belirlenir?</summary>
            <p>Görevin karmaşıklığı, seçilen kategori ve benzer işlerin tamamlanma süreleri kıyaslanarak hesaplanır.</p>
          </details>
          <details className="ff-faq-item">
            <summary>🔒 Kişisel çalışma verilerim güvende mi?</summary>
            <p>Kesinlikle. Tüm verileriniz uçtan uca şifrelenir ve yapay zeka modellerini eğitmek için asla üçüncü partilerle paylaşılmaz.</p>
          </details>
          <details className="ff-faq-item">
            <summary>⚙️ Model hassasiyetini (Akış) neden seçiyorum?</summary>
            <p>Agresif mod, kısa ve sık aralarla hiper-odak sağlar. Esnek mod ise uzun soluklu, derin çalışma seanslarını destekler. Günlük ritminize göre modeli kalibre etmenizi sağlar.</p>
          </details>
          <details className="ff-faq-item">
            <summary>🏢 Takım planında (Enterprise) süreç nasıl işliyor?</summary>
            <p>Kayıt sonrası size atanan müşteri temsilcimiz ekibiniz için özel bir alan oluşturur. Merkezi yönetim ve departman bazlı verimlilik raporlarına erişim sağlarsınız.</p>
          </details>
        </div>
      </section>

      <footer className="ff-footer">
        <p>© {new Date().getFullYear()} FocusFlow AI. Tüm Hakları Saklıdır.</p>
      </footer>

      {/* DÜZENLENMİŞ MODAL ALANI (TAKIM İÇİN FARKLI, BİREYSEL İÇİN FARKLI EKRAN) */}
      {isModalOpen && (
        <div className="ff-modal-overlay">
          <div className="ff-modal-box">
            <h3>{selectedPlan} Aktivasyonu</h3>
            
            {selectedPlan === 'Enterprise (Takım)' ? (
              <>
                <p>Ekibiniz için özel çalışma alanını hazırlıyoruz. Lütfen takım detaylarını girin:</p>
                <div className="ff-modal-inputs">
                  <Input label="Şirket / Takım Adı" placeholder="Örn: FocusFlow Team" onChange={() => {}} />
                <input 
  type="number" 
  placeholder="Ekip Sayısı"
  min={1} 
  max={15} 
  onInput={(e) => {
    if (Number(e.currentTarget.value) > 15) {
      e.currentTarget.value = '15';
      alert('Takım planında maksimum 15 kişi eklenebilir.');
    }
  }}
  /* className veya onChange gibi senin projendeki diğer özellikler aynen kalsın */
/>
                </div>
              </>
            ) : (
              <>
                <p>Plan kurulumu için yapay zeka modelinizin davranış biçimini (Akış) kalibre edin:</p>
                <Select 
                  label="Model Hassasiyeti Seçin" 
                  options={[
                    { value: 'agresif', label: '🔥 Agresif (Sıkı Pomodoro)' }, 
                    { value: 'esnek', label: '🌱 Esnek (Uzun Odaklanma)' }
                  ]} 
                  value="agresif" 
                  onChange={() => {}} 
                />
              </>
            )}

            <div className="ff-modal-actions">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>İptal</Button>
              <Button variant="primary" size="sm" onClick={() => { alert('İşlem başarıyla tamamlandı!'); setIsModalOpen(false); }}>İşlemi Tamamla</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;