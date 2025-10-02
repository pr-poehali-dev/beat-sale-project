import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  type: 'beat' | 'drumkit';
  bpm?: number;
  genre?: string;
  image: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Dark Trap Beat', price: 2900, type: 'beat', bpm: 140, genre: 'Trap', image: 'https://v3.fal.media/files/panda/tlJRkTY-_2ABbDxmgsdZ0_output.png' },
    { id: 2, name: 'Lo-Fi Hip Hop', price: 2400, type: 'beat', bpm: 85, genre: 'Lo-Fi', image: 'https://v3.fal.media/files/panda/tlJRkTY-_2ABbDxmgsdZ0_output.png' },
    { id: 3, name: 'Drill Kit Pro', price: 3900, type: 'drumkit', genre: 'Drill', image: 'https://v3.fal.media/files/panda/tlJRkTY-_2ABbDxmgsdZ0_output.png' },
    { id: 4, name: '808 Bass Collection', price: 4900, type: 'drumkit', genre: 'Trap', image: 'https://v3.fal.media/files/panda/tlJRkTY-_2ABbDxmgsdZ0_output.png' },
    { id: 5, name: 'Melodic Rap Beat', price: 3200, type: 'beat', bpm: 150, genre: 'Rap', image: 'https://v3.fal.media/files/panda/tlJRkTY-_2ABbDxmgsdZ0_output.png' },
    { id: 6, name: 'Vinyl Drums Kit', price: 2900, type: 'drumkit', genre: 'Lo-Fi', image: 'https://v3.fal.media/files/panda/tlJRkTY-_2ABbDxmgsdZ0_output.png' },
  ];

  const services: Service[] = [
    { id: 1, name: 'Mixing', description: 'Профессиональное сведение вашего трека с балансировкой частот и динамики', price: 15000, icon: 'Sliders' },
    { id: 2, name: 'Mastering', description: 'Финальная обработка для коммерческого релиза с максимальной громкостью', price: 8000, icon: 'Volume2' },
    { id: 3, name: 'Mixing + Mastering', description: 'Полный цикл обработки трека от сведения до мастеринга', price: 20000, icon: 'Headphones' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderNavigation = () => (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/9b10ca61-9c13-4dac-bb19-e31cfd2c53bc.png" alt="Beat Empire" className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Beat Empire
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => setActiveSection('beats')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'beats' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Биты
            </button>
            <button 
              onClick={() => setActiveSection('drumkits')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'drumkits' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Драм-киты
            </button>
            <button 
              onClick={() => setActiveSection('services')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'services' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Услуги
            </button>
            <button 
              onClick={() => setActiveSection('profile')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Профиль
            </button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cartCount} {cartCount === 1 ? 'товар' : 'товара'} на сумму {totalPrice.toLocaleString()} ₽
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽ × {item.quantity}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого:</span>
                        <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );

  const renderHero = () => (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-background to-red-900/20" />
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img src="https://cdn.poehali.dev/files/9b10ca61-9c13-4dac-bb19-e31cfd2c53bc.png" alt="" className="w-96 h-96 object-contain" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse-glow">
            Профессиональные биты и драм-киты
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Создавай хиты с лучшими инструментами. Эксклюзивные биты, драм-киты и услуги сведения-мастеринга от профессионалов.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => setActiveSection('beats')}>
              <Icon name="Play" size={20} className="mr-2" />
              Слушать биты
            </Button>
            <Button size="lg" variant="outline" onClick={() => setActiveSection('drumkits')}>
              <Icon name="Package" size={20} className="mr-2" />
              Драм-киты
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: 'Zap', title: 'Мгновенная загрузка', desc: 'Скачивайте сразу после покупки' },
            { icon: 'Award', title: 'Премиум качество', desc: 'Профессиональное звучание' },
            { icon: 'Shield', title: 'Лицензия включена', desc: 'Используйте в коммерческих целях' },
          ].map((feature, i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon as any} className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderProducts = (type?: 'beat' | 'drumkit') => {
    const filtered = type ? products.filter(p => p.type === type) : products;
    const title = type === 'beat' ? 'Биты' : type === 'drumkit' ? 'Драм-киты' : 'Популярные товары';

    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <Card key={product.id} className="group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-1 items-end">
                      {[...Array(24)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-primary/60 rounded-full animate-pulse-glow"
                          style={{ 
                            height: `${Math.random() * 60 + 20}px`,
                            animationDelay: `${i * 0.05}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90">
                      {product.type === 'beat' ? 'Beat' : 'Drum Kit'}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {product.genre && <Badge variant="outline">{product.genre}</Badge>}
                    {product.bpm && <span className="text-sm">• {product.bpm} BPM</span>}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                  <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderServices = () => (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Услуги сведения и мастеринга</h2>
        <p className="text-muted-foreground mb-12 text-lg">Доверьте обработку своего трека профессионалам</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card key={service.id} className="hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon name={service.icon as any} className="text-white" size={32} />
                </div>
                <CardTitle className="text-2xl">{service.name}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col gap-4">
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">от</span>
                  <span className="text-3xl font-bold text-primary">{service.price.toLocaleString()} ₽</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Заказать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderProfile = () => (
    <section className="py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">Профиль</h2>
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="User" size={40} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Гость</CardTitle>
                <CardDescription>Войдите, чтобы получить доступ к покупкам</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-lg bg-muted/50 border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="ShoppingBag" size={20} />
                Мои покупки
              </h3>
              <p className="text-muted-foreground">Здесь будут отображаться ваши покупки после авторизации</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Download" size={20} />
                Загрузки
              </h3>
              <p className="text-muted-foreground">Доступ к скачанным файлам</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary" size="lg">
              <Icon name="LogIn" size={20} className="mr-2" />
              Войти
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}
      
      {activeSection === 'home' && (
        <>
          {renderHero()}
          {renderProducts()}
        </>
      )}
      
      {activeSection === 'beats' && renderProducts('beat')}
      {activeSection === 'drumkits' && renderProducts('drumkit')}
      {activeSection === 'services' && renderServices()}
      {activeSection === 'profile' && renderProfile()}

      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/9b10ca61-9c13-4dac-bb19-e31cfd2c53bc.png" alt="Beat Empire" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold">Beat Empire</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2024 Beat Empire. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Youtube" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Music" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;