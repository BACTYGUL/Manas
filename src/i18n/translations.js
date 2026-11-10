/**
 * Централизованные переводы на 3 языка: KY / RU / EN
 * Использование: t('key', lang)
 */

const T = {
  // ── Навигация ──────────────────────────────────────────────────────────────
  nav_home:     { ky: 'Башкы бет',      ru: 'Главная',       en: 'Home' },
  nav_history:  { ky: 'Эпостун тарыхы', ru: 'История эпоса', en: 'Epic History' },
  nav_heroes:   { ky: 'Каармандар',     ru: 'Персонажи',     en: 'Characters' },
  nav_shop:     { ky: 'Дүкөн',         ru: 'Магазин',       en: 'Shop' },
  nav_cart:     { ky: 'Корзина',        ru: 'Корзина',       en: 'Cart' },
  nav_login:    { ky: 'Кирүү',         ru: 'Войти',         en: 'Sign In' },
  nav_logout:   { ky: 'Чыгуу',         ru: 'Выйти',         en: 'Sign Out' },
  nav_reviews:  { ky: 'Пикирлер',      ru: 'Отзывы',        en: 'Reviews' },

  // ── Главная ────────────────────────────────────────────────────────────────
  hero_title:    { ky: 'МАНАС ЭПОСУ', ru: 'МАНАС ЭПОСУ', en: 'MANAS EPIC' },
  hero_subtitle: {
    ky: '«Эл үчүн, жер үчүн, эркиндик үчүн!»',
    ru: '«За народ, за землю, за свободу!»',
    en: '"For the people, for the land, for freedom!"',
  },
  hero_desc: {
    ky: 'Манас эпосу — кыргыз элинин улуттук каада-салты, тарыхы, баатырдыгы жана асыл рухунун чагылдырылышы.',
    ru: 'Эпос Манас — отражение национальных традиций, истории и духа кыргызского народа.',
    en: 'The Manas Epic reflects the national traditions, history, and spirit of the Kyrgyz people.',
  },
  hero_read:  { ky: 'Эпосту окуу',  ru: 'Читать эпос', en: 'Read Epic' },
  hero_shop:  { ky: 'Дүкөн',       ru: 'Магазин',     en: 'Shop' },
  hero_quote: {
    ky: '«Манас — кыргыз элинин түбөлүк руху»',
    ru: '«Манас — вечный дух кыргызского народа»',
    en: '"Manas — the eternal spirit of the Kyrgyz people"',
  },

  about_title: {
    ky: 'Манас эпосу деген эмне?',
    ru: 'Что такое эпос Манас?',
    en: 'What is the Manas Epic?',
  },
  about_text: {
    ky: 'Манас — дүйнөдөгү эң чоң эпостордун бири. Ал кыргыз элинин тарыхын, баатырдык өнөрүн, элдик акылмандыгын жана адамдык баалуулуктарын камтыйт. Эпос муундан муунга оозеки түрдө сакталып, бүгүнкү күндө да жашап келет.',
    ru: 'Манас — один из крупнейших эпосов мира. Он охватывает историю, героизм, народную мудрость и человеческие ценности кыргызского народа. Эпос передавался устно из поколения в поколение и живёт по сей день.',
    en: 'Manas is one of the largest epics in the world, encompassing the history, heroism, folk wisdom, and human values of the Kyrgyz people. It was passed down orally through generations and lives on to this day.',
  },
  about_btn:   { ky: 'Толук маалымат', ru: 'Подробнее', en: 'Learn More' },
  about_quote: {
    ky: '«Манас – өлбөс элдин өлбөс дастаны»',
    ru: '«Манас – бессмертная поэма бессмертного народа»',
    en: '"Manas – the immortal epic of an immortal people"',
  },

  // ── Карточки главной ───────────────────────────────────────────────────────
  card_history:      { ky: 'Эпостун тарыхы',          ru: 'История эпоса',       en: 'Epic History' },
  card_heroes:       { ky: 'Каармандар',               ru: 'Персонажи',           en: 'Characters' },
  card_horse:        { ky: 'Манастын тулпары',         ru: 'Конь Манаса',         en: "Manas's Horse" },
  card_facts:        { ky: 'Кызыктуу маалыматтар',    ru: 'Интересные факты',    en: 'Interesting Facts' },
  card_history_desc: {
    ky: 'Манас эпосунун келип чыгышы, жазылыш тарыхы жана улантуулары тууралуу.',
    ru: 'О происхождении, истории записи и продолжениях эпоса Манас.',
    en: 'About the origin, written history and continuations of the Manas epic.',
  },
  card_heroes_desc: {
    ky: 'Манас, Семетей, Сейтек жана башка баатырлардын образы жана ролу.',
    ru: 'Образы и роли Манаса, Семетея, Сейтека и других героев.',
    en: 'The images and roles of Manas, Semetey, Seitek and other heroes.',
  },
  card_horse_desc: {
    ky: 'Аккула ат жана анын эрдиктери — эпостун өзгөчо бөлүгу.',
    ru: 'Конь Аккула и его подвиги — особая часть эпоса.',
    en: 'Akkula horse and his feats — a special part of the epic.',
  },
  card_facts_desc: {
    ky: 'Манас эпосу жөнүндө кызыктуу фактылар, сан, цитаталар жана башкалар.',
    ru: 'Интересные факты, цифры, цитаты и другое об эпосе Манас.',
    en: 'Interesting facts, numbers, quotes and more about the Manas epic.',
  },
  more: { ky: 'Көбүрөөк', ru: 'Подробнее', en: 'Learn more' },

  // ── Магазин ────────────────────────────────────────────────────────────────
  shop_title:    { ky: 'Манас Дүкөнү',                    ru: 'Магазин Манас',              en: 'Manas Shop' },
  shop_subtitle: { ky: 'Кыргыз маданиятынын сымбаттары', ru: 'Символы кыргызской культуры', en: 'Symbols of Kyrgyz culture' },
  shop_search:   { ky: 'Издөө...',                        ru: 'Поиск...',                   en: 'Search...' },
  shop_empty:    { ky: 'Товар табылган жок',              ru: 'Товаров не найдено',          en: 'No products found' },
  shop_error:    { ky: 'Маалыматтарды жүктөө ката кетти', ru: 'Ошибка загрузки данных',     en: 'Failed to load data' },
  shop_few:      { ky: 'Аз калды',                        ru: 'Мало',                       en: 'Few left' },
  shop_fav:      { ky: 'Тандамалга',                      ru: 'В избранное',                en: 'Add to favorites' },
  shop_found_pre:  { ky: '',     ru: 'Найдено: ', en: '' },
  shop_found_post: { ky: ' товар табылды', ru: ' товаров', en: ' items found' },

  cat_all:       { ky: 'Баары',      ru: 'Все',      en: 'All' },
  cat_books:     { ky: 'Китептер',   ru: 'Книги',    en: 'Books' },
  cat_souvenirs: { ky: 'Сувенирлер', ru: 'Сувениры', en: 'Souvenirs' },
  cat_clothes:   { ky: 'Кийим',      ru: 'Одежда',   en: 'Clothing' },
  cat_music:     { ky: 'Музыка',     ru: 'Музыка',   en: 'Music' },

  sort_default:   { ky: 'Демейки',      ru: 'По умолчанию',  en: 'Default' },
  sort_cheap:     { ky: 'Баа: арзан',   ru: 'Цена: дешевле', en: 'Price: low→high' },
  sort_expensive: { ky: 'Баа: кымбат',  ru: 'Цена: дороже',  en: 'Price: high→low' },
  sort_rating:    { ky: 'Рейтинг',      ru: 'Рейтинг',       en: 'Rating' },
  categories:     { ky: 'Категориялар', ru: 'Категории',      en: 'Categories' },
  sorting:        { ky: 'Иреттөө',      ru: 'Сортировка',     en: 'Sort by' },

  // ── Товар / Detail ─────────────────────────────────────────────────────────
  in_stock:      { ky: 'Барда бар',          ru: 'В наличии',         en: 'In stock' },
  out_stock:     { ky: 'Жок',               ru: 'Нет в наличии',     en: 'Out of stock' },
  pieces:        { ky: 'даана',              ru: 'шт.',               en: 'pcs' },
  som:           { ky: 'сом',               ru: 'сом',               en: 'som' },
  add_cart:      { ky: 'Корзинага кошуу',    ru: 'В корзину',         en: 'Add to cart' },
  added:         { ky: 'Кошулду!',           ru: 'Добавлено!',        en: 'Added!' },
  favorite:      { ky: 'Тандамал',           ru: 'Избранное',         en: 'Favorite' },
  back:          { ky: '← Артка',            ru: '← Назад',           en: '← Back' },
  not_found:     { ky: 'Товар табылган жок', ru: 'Товар не найден',   en: 'Product not found' },
  to_shop:       { ky: 'Дүкөнгө кайтуу',    ru: 'Вернуться в магазин', en: 'Back to shop' },
  reviews_count: { ky: 'пикир',             ru: 'отзывов',           en: 'reviews' },

  // ── Отзывы ────────────────────────────────────────────────────────────────
  reviews:                 { ky: 'Пикирлер',                     ru: 'Отзывы',                        en: 'Reviews' },
  leave_review:            { ky: 'Пикир калтыруу',               ru: 'Оставить отзыв',                en: 'Leave a review' },
  review_placeholder:      { ky: 'Пикириңизди жазыңыз...',       ru: 'Напишите ваш отзыв...',         en: 'Write your review...' },
  review_name_placeholder: { ky: 'Атыңыз (милдеттүү эмес)',      ru: 'Ваше имя (необязательно)',      en: 'Your name (optional)' },
  review_sent:             { ky: 'Пикириңиз кошулду!',           ru: 'Отзыв добавлен!',               en: 'Review added!' },
  review_empty:            { ky: 'Азырынча пикир жок',           ru: 'Отзывов пока нет',              en: 'No reviews yet' },
  send:                    { ky: 'Жөнөтүү',                      ru: 'Отправить',                     en: 'Submit' },
  delete:                  { ky: 'Өчүрүү',                       ru: 'Удалить',                       en: 'Delete' },
  guest:                   { ky: 'Мейман',                        ru: 'Гость',                         en: 'Guest' },

  // ── Корзина ────────────────────────────────────────────────────────────────
  cart_title:    { ky: 'Корзина',                            ru: 'Корзина',                    en: 'Cart' },
  cart_empty:    { ky: 'Корзина бош',                        ru: 'Корзина пуста',              en: 'Cart is empty' },
  cart_go_shop:  { ky: 'Дүкөнгө өтүү',                      ru: 'Перейти в магазин',          en: 'Go to shop' },
  cart_clear:    { ky: 'Баарын тазалоо',                     ru: 'Очистить корзину',           en: 'Clear cart' },
  cart_items:    { ky: 'Товарлар',                           ru: 'Товары',                     en: 'Items' },
  cart_delivery: { ky: 'Жеткирүү',                           ru: 'Доставка',                   en: 'Delivery' },
  cart_free:     { ky: 'Акысыз',                             ru: 'Бесплатно',                  en: 'Free' },
  cart_total:    { ky: 'Баардыгы',                           ru: 'Всего',                      en: 'Total' },
  cart_summary:  { ky: 'Буйрутма жыйынтыгы',                ru: 'Итого',                      en: 'Order summary' },
  order_btn:     { ky: 'Заказ берүү',                        ru: 'Оформить заказ',             en: 'Place order' },
  order_success: { ky: 'Заказыңыз кабыл алынды!',            ru: 'Заказ принят!',              en: 'Order placed!' },
  order_msg:     { ky: 'Биз жакын арада сизге байланышабыз.', ru: 'Мы свяжемся с вами в ближайшее время.', en: 'We will contact you shortly.' },
  order_name:    { ky: 'Аты-жөнүңүз',                       ru: 'Ваше имя',                   en: 'Your name' },
  order_phone:   { ky: 'Телефон номериңиз',                  ru: 'Номер телефона',             en: 'Phone number' },
  order_address: { ky: 'Дарегиңиз',                          ru: 'Адрес доставки',             en: 'Delivery address' },
  order_comment: { ky: 'Комментарий (милдеттүү эмес)',       ru: 'Комментарий (необязательно)', en: 'Comment (optional)' },
  order_data:    { ky: 'Маалымат',                           ru: 'Данные',                     en: 'Details' },

  // ── Авторизация ────────────────────────────────────────────────────────────
  auth_login:      { ky: 'Кирүү',                  ru: 'Войти',                      en: 'Sign In' },
  auth_register:   { ky: 'Катталуу',               ru: 'Регистрация',                en: 'Sign Up' },
  auth_name:       { ky: 'Аты-жөнү',              ru: 'Имя',                        en: 'Full name' },
  auth_email:      { ky: 'Email',                  ru: 'Email',                      en: 'Email' },
  auth_password:   { ky: 'Сырсөз',                ru: 'Пароль',                     en: 'Password' },
  auth_confirm:    { ky: 'Сырсөздү ырастоо',      ru: 'Подтвердите пароль',         en: 'Confirm password' },
  auth_no_acc:     { ky: 'Аккаунт жокпу?',        ru: 'Нет аккаунта?',              en: 'No account?' },
  auth_has_acc:    { ky: 'Аккаунт барбы?',        ru: 'Уже есть аккаунт?',          en: 'Already have an account?' },
  auth_back:       { ky: '← Башкы бет',           ru: '← Главная',                  en: '← Home' },
  auth_pass_match: { ky: 'Сырсөздөр дал келбейт', ru: 'Пароли не совпадают',        en: 'Passwords do not match' },
  auth_success:    { ky: 'Ийгиликтүү катталдыңыз!', ru: 'Успешно зарегистрированы!', en: 'Successfully registered!' },
  auth_loading:    { ky: 'Жүктөлүүдө...',          ru: 'Загрузка...',                en: 'Loading...' },
  auth_server_err: {
    ky: 'Серверге байланышуу ката кетти. Кайра аракет кылыңыз.',
    ru: 'Ошибка подключения к серверу. Попробуйте снова.',
    en: 'Server connection error. Please try again.',
  },
  auth_email_taken: { ky: 'Бул email катталган', ru: 'Этот email уже занят', en: 'This email is already taken' },
  auth_wrong_creds: { ky: 'Email же сырсөз туура эмес', ru: 'Неверный email или пароль', en: 'Incorrect email or password' },

  // ── Хлебные крошки ────────────────────────────────────────────────────────
  breadcrumb_home: { ky: 'Башкы бет', ru: 'Главная', en: 'Home' },
  breadcrumb_shop: { ky: 'Дүкөн',    ru: 'Магазин', en: 'Shop' },

  // ── История эпоса ─────────────────────────────────────────────────────────
  history_title: { ky: 'Эпостун тарыхы',  ru: 'История эпоса',  en: 'Epic History' },
  history_sub: {
    ky: 'Дүйнөдөгү эң чоң эпостордун бирин жараткан улуу маданий мурастын тарыхы',
    ru: 'История великого культурного наследия — одного из крупнейших эпосов мира',
    en: 'The history of the great cultural heritage — one of the largest epics in the world',
  },
  history_what_title: {
    ky: 'Манас эпосу деген эмне?',
    ru: 'Что такое эпос Манас?',
    en: 'What is the Manas Epic?',
  },
  history_p1: {
    ky: 'Манас эпосу — кыргыз элинин улуттук баатырдык эпосу. Ал дүйнөдөгү эң чоң оозеки адабий чыгармалардын бири болуп эсептелет жана 500 000 ыр сабынан ашат — бул Илиада менен Одиссеяны чогуу алганда 20 эсе чоңураак.',
    ru: 'Эпос Манас — национальный героический эпос кыргызского народа. Он считается одним из крупнейших устных произведений в мире и превышает 500 000 строк — это в 20 раз больше Илиады и Одиссеи вместе взятых.',
    en: 'The Manas Epic is the national heroic epic of the Kyrgyz people, considered one of the largest oral works in the world with over 500,000 verses — 20 times longer than the Iliad and Odyssey combined.',
  },
  history_p2: {
    ky: 'Эпос үч бөлүктөн турат: Манас, Семетей жана Сейтек — бул үч муундун баатырдык жолун баяндайт.',
    ru: 'Эпос состоит из трёх частей: Манас, Семетей и Сейтек — повествует о героическом пути трёх поколений.',
    en: 'The epic consists of three parts: Manas, Semetey, and Seitek — narrating the heroic journey of three generations.',
  },
  stat_verses:      { ky: 'ыр сабы',          ru: 'стихов',              en: 'verses' },
  stat_languages:   { ky: 'тилге которулган', ru: 'языков перевода',     en: 'languages' },
  stat_history:     { ky: 'жыл тарых',        ru: 'лет истории',         en: 'years of history' },
  timeline_title:   { ky: 'Тарыхый хронология', ru: 'Историческая хронология', en: 'Historical Timeline' },
  history_quote: {
    ky: '«Манас — кыргыз элинин жүрөгү, тарыхы жана келечеги»',
    ru: '«Манас — сердце, история и будущее кыргызского народа»',
    en: '"Manas — the heart, history and future of the Kyrgyz people"',
  },
  history_cite: { ky: '— Чыңгыз Айтматов', ru: '— Чингиз Айтматов', en: '— Chingiz Aitmatov' },

  // Timeline items
  tl_1_year:  { ky: 'VIII–X кк.',    ru: 'VIII–X вв.',     en: '8th–10th c.' },
  tl_1_title: { ky: 'Эпостун пайда болушу', ru: 'Зарождение эпоса', en: 'Birth of the Epic' },
  tl_1_desc:  {
    ky: 'Манас эпосу байыркы кыргыз уруулары арасында оозеки түрдө жаралган. Баатырдык жырлардын биринчи варианттары ушул доордо калыптанган деп эсептелет.',
    ru: 'Эпос Манас зародился устно среди древних кыргызских племён. Считается, что первые варианты героических песнопений сформировались именно в эту эпоху.',
    en: 'The Manas epic originated orally among ancient Kyrgyz tribes. The first versions of heroic songs are believed to have formed during this era.',
  },
  tl_2_year:  { ky: 'XI–XV кк.',   ru: 'XI–XV вв.',    en: '11th–15th c.' },
  tl_2_title: { ky: 'Манасчылар доору', ru: 'Эпоха манасчи', en: 'Era of Manaschi' },
  tl_2_desc:  {
    ky: 'Манасчылар — эпосту жатка айткан, муундан муунга өткөрүп берген касиеттүү жомокчулар. Алардын аркасында эпостун текстери сакталып, байыган.',
    ru: 'Манасчи — священные сказители, знавшие эпос наизусть и передававшие его из поколения в поколение. Благодаря им тексты эпоса сохранились и обогатились.',
    en: 'Manaschi were sacred bards who knew the epic by heart and passed it down through generations. Thanks to them the texts were preserved and enriched.',
  },
  tl_3_year:  { ky: 'XIX к.',   ru: 'XIX в.',    en: '19th c.' },
  tl_3_title: { ky: 'Жазылып алынышы', ru: 'Первая запись', en: 'First Written Record' },
  tl_3_desc:  {
    ky: 'Орус окумуштуусу Чокан Валиханов 1856-жылы эпостун "Кокөтөйдүн ашы" бөлүгүн биринчи жолу жазып алган. Кийин Радлов да чоң үлүш кошкон.',
    ru: 'Русский учёный Чокан Валиханов в 1856 году записал часть «Поминки по Кокотою». Позднее Радлов также внёс большой вклад.',
    en: 'Russian scholar Chokan Valikhanov recorded the "Wake of Kökötöy" section in 1856. Later Radlov also made a significant contribution.',
  },
  tl_4_year:  { ky: '1920–1940', ru: '1920–1940', en: '1920–1940' },
  tl_4_title: { ky: 'Советтик доор', ru: 'Советская эпоха', en: 'Soviet Era' },
  tl_4_desc:  {
    ky: 'Манасчы Сагымбай Орозбаков 500 000 ыр сабын айтып берген — бул эпостун эң чоң варианты болгон. Кийинчерээк Саякбай Каралаев да зор салым кошкон.',
    ru: 'Манасчи Сагымбай Орозбаков продиктовал 500 000 строк — это крупнейший вариант эпоса. Позже Саякбай Каралаев также внёс огромный вклад.',
    en: 'Manaschi Sagimbay Orozbakov dictated 500,000 verses — the largest version of the epic. Later Sayakbay Karalaev also made a tremendous contribution.',
  },
  tl_5_year:  { ky: '1995', ru: '1995', en: '1995' },
  tl_5_title: { ky: 'ЮНЕСКО таануусу', ru: 'Признание ЮНЕСКО', en: 'UNESCO Recognition' },
  tl_5_desc:  {
    ky: 'Манас эпосунун 1000 жылдыгы ЮНЕСКО тарабынан расмий белгиленген. Бул Кыргызстан үчүн чоң маданий жеңиш болгон.',
    ru: '1000-летие эпоса Манас официально отмечено ЮНЕСКО. Это стало большой культурной победой для Кыргызстана.',
    en: 'The 1000th anniversary of the Manas epic was officially celebrated by UNESCO, a great cultural victory for Kyrgyzstan.',
  },
  tl_6_year:  { ky: 'Бүгүнкү күн', ru: 'Наши дни', en: 'Today' },
  tl_6_title: { ky: 'Дүйнөлүк мурас', ru: 'Мировое наследие', en: 'World Heritage' },
  tl_6_desc:  {
    ky: 'Бүгүн Манас эпосу дүйнөнүн 40дан ашуун тилине которулган. Ал адамзаттын материалдык эмес маданий мурасынын бир бөлүгү катары таанылган.',
    ru: 'Сегодня эпос Манас переведён более чем на 40 языков мира и признан частью нематериального культурного наследия человечества.',
    en: 'Today the Manas epic has been translated into over 40 languages and is recognized as part of humanity\'s intangible cultural heritage.',
  },

  // ── Персонажи ─────────────────────────────────────────────────────────────
  heroes_title: { ky: 'Каармандар', ru: 'Персонажи', en: 'Characters' },
  heroes_sub: {
    ky: 'Манас эпосунун улуу баатырлары жана алардын баяндары',
    ru: 'Великие герои эпоса Манас и их истории',
    en: 'The great heroes of the Manas epic and their stories',
  },
  heroes_full:  { ky: 'Толук маалымат ↓', ru: 'Подробнее ↓', en: 'Read more ↓' },
  heroes_close: { ky: 'Жабуу ↑',           ru: 'Свернуть ↑', en: 'Close ↑' },
  heroes_quote: {
    ky: '«Баатыр — өлбөйт, анын иши өлбөйт»',
    ru: '«Герой не умирает, его дело не умирает»',
    en: '"A hero never dies, his deeds never die"',
  },
  heroes_cite: { ky: '— Манас эпосунан', ru: '— Из эпоса Манас', en: '— From the Manas epic' },

  // Heroes data
  h1_name:  { ky: 'Манас',           ru: 'Манас',           en: 'Manas' },
  h1_role:  { ky: 'Улуу баатыр',     ru: 'Великий герой',   en: 'Great Hero' },
  h1_desc:  {
    ky: 'Манас — эпостун башкы каарманы. Ал кыргыз элин бириктирип, душмандардан коргогон улуу баатыр. Анын күчү, акылмандыгы жана адилеттүүлүгү бүтүндөй элдин символуна айланган.',
    ru: 'Манас — главный герой эпоса. Он объединил кыргызский народ и защитил его от врагов. Его сила, мудрость и справедливость стали символом всего народа.',
    en: 'Manas is the main hero of the epic. He united the Kyrgyz people and protected them from enemies. His strength, wisdom, and justice became a symbol of the entire nation.',
  },
  h1_f1: { ky: 'Кырк чоро деп аталган 40 жолдошу болгон',   ru: 'Имел 40 сподвижников — «кырк чоро»',  en: 'Had 40 companions known as "kyrk choro"' },
  h1_f2: { ky: 'Аккула — анын сыйкырдуу ак аты',              ru: 'Аккула — его волшебный белый конь',    en: 'Akkula — his magical white horse' },
  h1_f3: { ky: 'Каныкей — сүйгөн аялы',                       ru: 'Каныкей — его любимая жена',           en: 'Kanikey — his beloved wife' },
  h1_f4: { ky: 'Алмамбет — эң жакын досу жана жолдошу',       ru: 'Алмамбет — ближайший друг и соратник', en: 'Almambet — his closest friend and companion' },

  h2_name:  { ky: 'Семетей',          ru: 'Семетей',          en: 'Semetey' },
  h2_role:  { ky: 'Манастын уулу',    ru: 'Сын Манаса',       en: 'Son of Manas' },
  h2_desc:  {
    ky: 'Семетей — Манастын баатыр уулу. Атасынын ишин улантып, элин коргоп, душмандарга каршы күрөшкөн. Ал да атасындай эрдик менен өмүр сүргөн.',
    ru: 'Семетей — сын-герой Манаса. Продолжил дело отца, защищал народ и боролся с врагами. Жил так же доблестно, как и его отец.',
    en: 'Semetey is Manas\'s heroic son. He continued his father\'s work, protecting the people and fighting enemies, living as valiantly as his father.',
  },
  h2_f1: { ky: 'Кыял — анын сүйгөн жары',                    ru: 'Кыял — его возлюбленная',              en: 'Kyal — his beloved' },
  h2_f2: { ky: 'Күлчорону жолдошу катары тапкан',              ru: 'Нашёл Кюльчоро как соратника',         en: 'Found Külchoro as his companion' },
  h2_f3: { ky: 'Чынкожо менен Токтобай — кас душмандары',    ru: 'Чынкожо и Токтобай — заклятые враги',  en: 'Chynkojo and Toktobay were his sworn enemies' },
  h2_f4: { ky: 'Атасынын өчүн алган',                         ru: 'Отомстил за отца',                     en: 'Avenged his father' },

  h3_name:  { ky: 'Сейтек',           ru: 'Сейтек',           en: 'Seitek' },
  h3_role:  { ky: 'Семетейдин уулу',  ru: 'Сын Семетея',      en: 'Son of Semetey' },
  h3_desc:  {
    ky: 'Сейтек — үчүнчү муундун баатыры. Ал атасы Семетей менен чоң энеси Чыйырдынын ырыскысын улантып, элине тынчтык алып келген.',
    ru: 'Сейтек — герой третьего поколения. Продолжил наследие отца Семетея и бабушки Чыйырды, принёс своему народу мир.',
    en: 'Seitek is the hero of the third generation. He continued the legacy of his father Semetey and grandmother Chiyirdi, bringing peace to his people.',
  },
  h3_f1: { ky: 'Эпостун үчүнчү бөлүмүнүн башкы каарманы',  ru: 'Главный герой третьей части эпоса',    en: 'Main hero of the third part of the epic' },
  h3_f2: { ky: 'Ата-бабаларынын руху менен байланышы бар',   ru: 'Связан с духами предков',              en: 'Connected to the spirits of his ancestors' },
  h3_f3: { ky: 'Элге тынчтык жана береке алып келген',       ru: 'Принёс народу мир и процветание',     en: 'Brought peace and prosperity to the people' },
  h3_f4: { ky: 'Эпостун финалын аяктаган баатыр',            ru: 'Герой, завершивший финал эпоса',       en: 'The hero who concluded the epic finale' },

  h4_name:  { ky: 'Алмамбет',            ru: 'Алмамбет',             en: 'Almambet' },
  h4_role:  { ky: 'Манастын жолдошу',    ru: 'Соратник Манаса',      en: "Manas's Companion" },
  h4_desc:  {
    ky: 'Алмамбет — Манаска эң берилген жолдош. Ал башында душман жагында болгон, бирок акыры Манаска кошулуп, анын эң ишенимдүү серигине айланган.',
    ru: 'Алмамбет — самый преданный соратник Манаса. Изначально был на стороне врага, но в конечном счёте присоединился к Манасу и стал его самым надёжным товарищем.',
    en: 'Almambet is Manas\'s most devoted companion. Originally on the enemy\'s side, he ultimately joined Manas and became his most trusted ally.',
  },
  h4_f1: { ky: 'Сыйкырдуу күчкө ээ болгон',  ru: 'Обладал магической силой',       en: 'Possessed magical powers' },
  h4_f2: { ky: 'Хан тукумунан чыккан',         ru: 'Происходил из ханского рода',     en: 'Descended from a khan lineage' },
  h4_f3: { ky: 'Манаска өзүн арнаган',          ru: 'Посвятил себя Манасу',            en: 'Devoted himself to Manas' },
  h4_f4: { ky: 'Чоң жортуулда каза тапкан',     ru: 'Погиб в великом походе',          en: 'Perished in the great campaign' },

  h5_name:  { ky: 'Каныкей',         ru: 'Каныкей',          en: 'Kanikey' },
  h5_role:  { ky: 'Манастын аялы',   ru: 'Жена Манаса',      en: 'Wife of Manas' },
  h5_desc:  {
    ky: 'Каныкей — Манаска берилген акылдуу жана батыл аял. Ал тек аялзат эмес, элинин инсандарын коргогон, Семетейди тарбиялаган улуу эне.',
    ru: 'Каныкей — мудрая и смелая жена Манаса. Она не просто женщина — великая мать, защищавшая своих людей и воспитавшая Семетея.',
    en: 'Kanikey is the wise and brave wife of Manas. She is not merely a woman — she is a great mother who protected her people and raised Semetey.',
  },
  h5_f1: { ky: 'Манасты жараланганда дайыма айыктырган',  ru: 'Всегда лечила Манаса от ран',     en: 'Always healed Manas from his wounds' },
  h5_f2: { ky: 'Семетейди жашыруун өстүргөн',              ru: 'Тайно вырастила Семетея',         en: 'Secretly raised Semetey' },
  h5_f3: { ky: 'Кыргыз аялынын символу',                   ru: 'Символ кыргызской женщины',      en: 'Symbol of Kyrgyz womanhood' },
  h5_f4: { ky: 'Акылдуулугу менен Манасты сактаган',       ru: 'Мудростью уберегла Манаса',      en: 'Saved Manas through her wisdom' },

  h6_name:  { ky: 'Чыйырды',          ru: 'Чыйырды',          en: 'Chiyirdi' },
  h6_role:  { ky: 'Манастын энеси',   ru: 'Мать Манаса',      en: 'Mother of Manas' },
  h6_desc:  {
    ky: 'Чыйырды — Манаска жан тарткан мээримдүү эне. Уулунун эрдиктери үчүн сыймыктанып, ар дайым дубасын берип турган.',
    ru: 'Чыйырды — любящая мать Манаса. Она гордилась подвигами сына и всегда молилась за него.',
    en: 'Chiyirdi is the loving mother of Manas. She was proud of her son\'s heroic deeds and always prayed for him.',
  },
  h6_f1: { ky: 'Жакыптын аялы',                              ru: 'Жена Жакыпа',                    en: 'Wife of Jakyp' },
  h6_f2: { ky: 'Манасты дүйнөгө алып келген',                 ru: 'Дала жизнь Манасу',              en: 'Gave birth to Manas' },
  h6_f3: { ky: 'Уулунун ар бир жеңишин сыймыктануу менен карттан', ru: 'С гордостью встречала победы сына', en: 'Greeted every victory of her son with pride' },
  h6_f4: { ky: 'Элдик аялдын ыйык образы',                    ru: 'Священный образ народной женщины', en: 'Sacred image of the folk woman' },

  // ── Конь Манаса ───────────────────────────────────────────────────────────
  horse_title: { ky: 'Манастын тулпары', ru: 'Конь Манаса',    en: "Manas's Horse" },
  horse_sub: {
    ky: 'Аккула — Манаска берилген сыйкырдуу ак тулпар',
    ru: 'Аккула — волшебный белый конь, преданный Манасу',
    en: 'Akkula — the magical white horse devoted to Manas',
  },
  horse_about: { ky: 'Аккула жөнүндө', ru: 'Об Аккуле', en: 'About Akkula' },
  horse_p1: {
    ky: 'Аккула — Манас эпосундагы улуу тулпар. "Ак" — таза, ыйык; "кула" — жылкынын түсү. Ал жөнөкөй жылкы эмес, Манаска берилген асман тартуусу катары баяндалат.',
    ru: 'Аккула — великий скакун в эпосе Манас. «Ак» — чистый, священный; «кула» — масть лошади. Он описывается не как обычный конь, а как небесный дар для Манаса.',
    en: 'Akkula is the great steed in the Manas epic. "Ak" means pure/sacred; "kula" is a horse colour. He is described not as an ordinary horse, but as a heavenly gift to Manas.',
  },
  horse_p2: {
    ky: 'Манас менен Аккуланын байланышы — адам менен жаратылыштын биримдигинин, берилгендик менен ишеничтин символу.',
    ru: 'Связь Манаса и Аккулы — символ единства человека и природы, преданности и доверия.',
    en: "The bond between Manas and Akkula is a symbol of the unity of man and nature, devotion and trust.",
  },
  horse_traits: { ky: 'Аккуланын касиеттери', ru: 'Качества Аккулы', en: "Akkula's Qualities" },
  horse_legends: { ky: 'Легендалар', ru: 'Легенды', en: 'Legends' },
  horse_quote: {
    ky: '«Аккула — Манастын канаты, жаны жана эркиндиги»',
    ru: '«Аккула — крылья, душа и свобода Манаса»',
    en: '"Akkula — the wings, soul and freedom of Manas"',
  },
  horse_cite: { ky: '— Манас эпосунан', ru: '— Из эпоса Манас', en: '— From the Manas epic' },

  // Traits
  tr1_label: { ky: 'Ылдамдык', ru: 'Скорость',    en: 'Speed' },
  tr1_desc:  {
    ky: 'Аккула желдей учат — бир суткада миң чакырым жол басат деп айтылат.',
    ru: 'Аккула летит как ветер — говорят, за сутки проходит тысячу вёрст.',
    en: 'Akkula flies like the wind — said to cover a thousand versts in a single day.',
  },
  tr2_label: { ky: 'Коргоо', ru: 'Защита', en: 'Protection' },
  tr2_desc:  {
    ky: 'Манасты душмандардан коргоп, кооптуу учурларда өз ба ашын тооруктун алдына коет.',
    ru: 'Защищает Манаса от врагов и в опасные моменты подставляет своё тело под удар.',
    en: 'Protects Manas from enemies and in dangerous moments shields him with his own body.',
  },
  tr3_label: { ky: 'Акыл', ru: 'Разум', en: 'Intelligence' },
  tr3_desc:  {
    ky: 'Аккула адам сыяктуу акылдуу — коркунучту алдын ала сезип, Манасты эскертет.',
    ru: 'Аккула умён как человек — чует опасность заранее и предупреждает Манаса.',
    en: 'Akkula is as intelligent as a human — senses danger in advance and warns Manas.',
  },
  tr4_label: { ky: 'Сыйкыр', ru: 'Магия', en: 'Magic' },
  tr4_desc:  {
    ky: 'Анын жалы алтындай жаркырайт, туяктарынан учкун чачырайт деп баяндалат.',
    ru: 'Его грива сверкает как золото, а от копыт разлетаются искры — так гласит предание.',
    en: 'His mane gleams like gold and sparks fly from his hooves — so the legend tells.',
  },

  // Legends
  leg1_title: { ky: 'Аккуланын туулушу',      ru: 'Рождение Аккулы',        en: 'Birth of Akkula' },
  leg1_text:  {
    ky: 'Аккула жарыкка биринчи келгенде эле өзгөчө болгон. Жылкы эмес, асман тарабынан жиберилген ыйык жан катары тааныла баштаган.',
    ru: 'С первых мгновений появления на свет Аккула был особенным. Его стали воспринимать не как лошадь, а как священное существо, посланное небесами.',
    en: 'From the first moment of his birth, Akkula was extraordinary. He was perceived not as a horse but as a sacred being sent from the heavens.',
  },
  leg2_title: { ky: 'Манас менен жолугушуу',    ru: 'Встреча с Манасом',     en: 'Meeting Manas' },
  leg2_text:  {
    ky: 'Жаш Манас Аккуланы биринчи жолу тепсең бастыра албай турган жерден тапкан. Бирок баатыр аны боорукердик менен жакындап, атты өзүнө ынандырган.',
    ru: 'Молодой Манас нашёл Аккулу в неприступном месте. Но герой приблизился к нему с добротой и убедил коня доверять ему.',
    en: 'Young Manas found Akkula in an inaccessible place. But the hero approached with kindness and convinced the horse to trust him.',
  },
  leg3_title: { ky: 'Чоң жортуулда',      ru: 'В великом походе',       en: 'The Great Campaign' },
  leg3_text:  {
    ky: 'Пекинге жасалган улуу жортуулда Аккула жүздөгөн кырдаал жолугуштуруп, Манасты аман алып чыккан. Бул — эки жандын өчпөс бирдигинин символу.',
    ru: 'В великом походе на Пекин Аккула преодолел сотни опасных ситуаций и вынес Манаса невредимым. Это символ нерушимого единства двух душ.',
    en: 'In the great campaign against Beijing, Akkula overcame hundreds of dangerous situations and carried Manas out unharmed — a symbol of the unbreakable bond of two souls.',
  },
  leg4_title: { ky: 'Символдук мааниси', ru: 'Символическое значение', en: 'Symbolic Meaning' },
  leg4_text:  {
    ky: 'Аккула — тек ат эмес, эркиндиктин, күчтүн жана берилгендиктин символу. Кыргыз маданиятында ак жылкы ыйык санала берет.',
    ru: 'Аккула — не просто конь, а символ свободы, силы и преданности. В кыргызской культуре белая лошадь считается священной.',
    en: 'Akkula is not just a horse — he is a symbol of freedom, strength, and devotion. In Kyrgyz culture the white horse is considered sacred.',
  },

  // ── Факты ─────────────────────────────────────────────────────────────────
  facts_title: { ky: 'Кызыктуу маалыматтар', ru: 'Интересные факты', en: 'Interesting Facts' },
  facts_sub: {
    ky: 'Манас эпосу жөнүндө таң калыштуу фактылар, цитаталар жана сандар',
    ru: 'Удивительные факты, цитаты и цифры об эпосе Манас',
    en: 'Amazing facts, quotes and figures about the Manas epic',
  },
  facts_all:          { ky: 'Баары',    ru: 'Все',    en: 'All' },
  facts_quotes_title: { ky: 'Цитаталар', ru: 'Цитаты', en: 'Quotes' },
  // Stat labels
  stat_verses_short:    { ky: 'ыр сабы',          ru: 'стихов',           en: 'verses' },
  stat_history_short:   { ky: 'жыл тарых',        ru: 'лет истории',      en: 'years of history' },
  stat_languages_short: { ky: 'тилге которулган', ru: 'языков перевода',  en: 'languages' },
  stat_manaschi:        { ky: 'манасчы бар',       ru: 'манасчи сегодня', en: 'manaschi today' },
  // Fact categories
  fcat_all:     { ky: 'Баары',     ru: 'Все',          en: 'All' },
  fcat_num:     { ky: 'Сан',       ru: 'Цифры',        en: 'Numbers' },
  fcat_struct:  { ky: 'Курулуш',   ru: 'Структура',    en: 'Structure' },
  fcat_numeric: { ky: 'Санарип',   ru: 'Числа',        en: 'Numerics' },
  fcat_recog:   { ky: 'Таанылуу',  ru: 'Признание',    en: 'Recognition' },
  fcat_culture: { ky: 'Маданият',  ru: 'Культура',     en: 'Culture' },
  fcat_people:  { ky: 'Инсандар',  ru: 'Личности',     en: 'People' },
  fcat_world:   { ky: 'Дүйнө',    ru: 'Мир',          en: 'World' },
  fcat_history: { ky: 'Тарых',     ru: 'История',      en: 'History' },
  fcat_symbol:  { ky: 'Символ',    ru: 'Символ',       en: 'Symbol' },

  // Facts items
  f1_title: { ky: '500 000+ ыр сабы',          ru: '500 000+ строк',               en: '500,000+ verses' },
  f1_text:  {
    ky: 'Манас эпосу дүйнөдөгү эң узун оозеки эпос. Ал Илиада жана Одиссеяны чогуу алганда 20 эсе, Махабхаратадан 2.5 эсе чоң.',
    ru: 'Эпос Манас — длиннейший в мире устный эпос. Он в 20 раз длиннее Илиады и Одиссеи вместе взятых и в 2,5 раза длиннее Махабхараты.',
    en: 'The Manas epic is the world\'s longest oral epic — 20 times longer than the Iliad and Odyssey combined, and 2.5 times longer than the Mahabharata.',
  },
  f2_title: { ky: '3 бөлүктөн турат',          ru: '3 части',                      en: '3 parts' },
  f2_text:  {
    ky: 'Эпос үч бөлүктөн турат: Манас, Семетей жана Сейтек — үч муундун баатырдык жолу.',
    ru: 'Эпос состоит из трёх частей: Манас, Семетей и Сейтек — героический путь трёх поколений.',
    en: 'The epic has three parts: Manas, Semetey, and Seitek — the heroic journey of three generations.',
  },
  f3_title: { ky: '40 чоро',                   ru: '40 богатырей',                 en: '40 Warriors' },
  f3_text:  {
    ky: '"Кырк чоро" — Манаска берилген 40 баатыр жолдош. Кыргыз санариптик маданиятында "кырк" — толуктуктун символу.',
    ru: '«Кырк чоро» — 40 преданных богатырей-соратников Манаса. В кыргызской символике «сорок» означает полноту и совершенство.',
    en: '"Kyrk Choro" — 40 devoted warrior companions of Manas. In Kyrgyz symbolism, "forty" represents completeness and perfection.',
  },
  f4_title: { ky: 'ЮНЕСКО — 1995',             ru: 'ЮНЕСКО — 1995',                en: 'UNESCO — 1995' },
  f4_text:  {
    ky: '1995-жылы Манас эпосунун 1000 жылдыгы ЮНЕСКО тарабынан белгиленген. Бул Кыргызстандын эл аралык аренадагы чоң жеңиши.',
    ru: 'В 1995 году ЮНЕСКО официально отметила 1000-летие эпоса Манас. Это стало большой победой Кыргызстана на международной арене.',
    en: 'In 1995 UNESCO officially commemorated the 1000th anniversary of the Manas epic — a great achievement for Kyrgyzstan on the world stage.',
  },
  f5_title: { ky: 'Манасчылар',               ru: 'Манасчи',                      en: 'Manaschi' },
  f5_text:  {
    ky: 'Манасчы — эпосту жатка билген касиеттүү жомокчу. Алар эпосту түш аркылуу үйрөнгөн деп ишенишет. Бүгүн 70дөн ашуун манасчы бар.',
    ru: 'Манасчи — священный сказитель, знающий эпос наизусть. Считается, что они постигают его через сны. Сегодня существует более 70 манасчи.',
    en: 'Manaschi — a sacred bard who knows the epic by heart. They are believed to learn it through dreams. Today there are over 70 manaschi.',
  },
  f6_title: { ky: 'Сагымбай Орозбаков',       ru: 'Сагымбай Орозбаков',           en: 'Sagimbay Orozbakov' },
  f6_text:  {
    ky: 'XIX–XX к. манасчы Сагымбай Орозбаков эпостун эң чоң вариантын айткан — 400 000 ыр сабынан ашуун. Ал "эпостун алтын дааналары" деп аталат.',
    ru: 'Манасчи XIX–XX вв. Сагымбай Орозбаков продиктовал крупнейший вариант эпоса — более 400 000 строк. Его называют «золотым изданием эпоса».',
    en: 'The 19th–20th century manaschi Sagimbay Orozbakov dictated the largest version of the epic — over 400,000 verses. He is called the "golden edition of the epic".',
  },
  f7_title: { ky: '40+ тилге которулган',     ru: 'Переведён на 40+ языков',       en: 'Translated into 40+ languages' },
  f7_text:  {
    ky: 'Эпос дүйнөнүн 40дан ашуун тилине которулган. Орус, кытай, англис, немец, француз жана башка тилдерде окуй аласыз.',
    ru: 'Эпос переведён более чем на 40 языков мира: русский, китайский, английский, немецкий, французский и другие.',
    en: 'The epic has been translated into over 40 languages including Russian, Chinese, English, German, French and others.',
  },
  f8_title: { ky: 'Чокан Валиханов — 1856',   ru: 'Чокан Валиханов — 1856',        en: 'Chokan Valikhanov — 1856' },
  f8_text:  {
    ky: 'Биринчи жазылып алынган текст: орус-казак окумуштуусу Чокан Валиханов 1856-жылы "Кокөтөйдүн ашы" бөлүгүн жазып алган.',
    ru: 'Первая запись: русско-казахский учёный Чокан Валиханов в 1856 году записал эпизод «Поминки по Кокотою».',
    en: 'The first written record: Russian-Kazakh scholar Chokan Valikhanov recorded the "Wake of Kökötöy" episode in 1856.',
  },
  f9_title: { ky: 'Кыргызстандын символу',   ru: 'Символ Кыргызстана',            en: 'Symbol of Kyrgyzstan' },
  f9_text:  {
    ky: 'Манас — Кыргызстандын расмий символдорунун бири. Бишкекте Манаска эстелик бар, анын аты менен аэропорт аталган.',
    ru: 'Манас — один из официальных символов Кыргызстана. В Бишкеке есть памятник Манасу, именем героя назван международный аэропорт.',
    en: 'Manas is one of Kyrgyzstan\'s official symbols. There is a statue of Manas in Bishkek and the international airport is named after him.',
  },

  // Quotes on facts page
  fq1_text: { ky: 'Эл үчүн өлгөн өлбөйт.',         ru: 'Умерший за народ не умирает.',        en: 'He who dies for the people does not die.' },
  fq1_src:  { ky: 'Манас эпосунан',                  ru: 'Из эпоса Манас',                      en: 'From the Manas epic' },
  fq2_text: { ky: 'Баатырдын жүрөгү — темирден, акылы — алтындан.', ru: 'Сердце героя — из железа, разум — из золота.', en: "A hero's heart is iron, his mind is gold." },
  fq2_src:  { ky: 'Манас эпосунан',                  ru: 'Из эпоса Манас',                      en: 'From the Manas epic' },
  fq3_text: { ky: 'Кыргыз элинин жүрөгү — Манас.',  ru: 'Сердце кыргызского народа — Манас.',  en: 'The heart of the Kyrgyz people is Manas.' },
  fq3_src:  { ky: 'Чыңгыз Айтматов',                ru: 'Чингиз Айтматов',                     en: 'Chingiz Aitmatov' },
  fq4_text: { ky: 'Аккула учса — асманда, жүгүрсө — жерде жок.', ru: 'Аккула летит — в небе, скачет — нет ему на земле.', en: 'Akkula flies — in the sky; gallops — none on earth.' },
  fq4_src:  { ky: 'Манас эпосунан',                  ru: 'Из эпоса Манас',                      en: 'From the Manas epic' },

  // ── Admin ─────────────────────────────────────────────────────────────────
  admin_panel:        { ky: 'Админ панель',          ru: 'Панель администратора',  en: 'Admin Panel' },
  admin_dashboard:    { ky: 'Dashboard',             ru: 'Панель',                 en: 'Dashboard' },
  admin_products_tab: { ky: 'Товарлар',              ru: 'Товары',                 en: 'Products' },
  admin_orders_tab:   { ky: 'Заказдар',              ru: 'Заказы',                 en: 'Orders' },
  admin_users_tab:    { ky: 'Колдонуучулар',         ru: 'Пользователи',           en: 'Users' },
  admin_home:         { ky: 'Башкы бет',             ru: 'Главная',                en: 'Home' },
  admin_overview:     { ky: 'Дүкөндүн сереп-жобосу', ru: 'Обзор магазина',         en: 'Store overview' },
  admin_stock:        { ky: 'Запас',                 ru: 'Склад',                  en: 'Stock' },
  admin_add_product:  { ky: 'Товар кошуу',           ru: 'Добавить товар',         en: 'Add product' },
  admin_edit_product: { ky: 'Товарды өзгөртүү',      ru: 'Редактировать товар',    en: 'Edit product' },
  admin_save:         { ky: 'Сактоо',                ru: 'Сохранить',              en: 'Save' },
  admin_add:          { ky: 'Кошуу',                 ru: 'Добавить',               en: 'Add' },
  admin_cancel:       { ky: 'Жокко чыгаруу',         ru: 'Отмена',                 en: 'Cancel' },
  admin_saved:        { ky: 'Сакталды!',             ru: 'Сохранено!',             en: 'Saved!' },
  admin_product_added:{ ky: 'Товар кошулду',          ru: 'Товар добавлен',         en: 'Product added' },
  admin_name_ky:      { ky: 'Аталышы (кырг.)',       ru: 'Название (кырг.)',       en: 'Name (ky)' },
  admin_name_ru:      { ky: 'Аталышы (орус.)',       ru: 'Название (рус.)',        en: 'Name (ru)' },
  admin_name_en:      { ky: 'Аталышы (англ.)',       ru: 'Название (англ.)',       en: 'Name (en)' },
  admin_category:     { ky: 'Категория',             ru: 'Категория',              en: 'Category' },
  admin_img_type:     { ky: 'Сүрөт түрү',            ru: 'Тип картинки',           en: 'Image type' },
  admin_price:        { ky: 'Баасы',                 ru: 'Цена',                   en: 'Price' },
  admin_stock_field:  { ky: 'Запас',                 ru: 'Остаток',                en: 'Stock' },
  admin_desc_ky:      { ky: 'Сүрөттөмө (кырг.)',     ru: 'Описание (кырг.)',       en: 'Description (ky)' },
  admin_desc_ru:      { ky: 'Сүрөттөмө (орус.)',     ru: 'Описание (рус.)',        en: 'Description (ru)' },
  admin_desc_en:      { ky: 'Сүрөттөмө (англ.)',     ru: 'Описание (англ.)',       en: 'Description (en)' },
  admin_search:       { ky: 'Издөө...',              ru: 'Поиск...',               en: 'Search...' },
  admin_loading:      { ky: 'Жүктөлүүдө...',         ru: 'Загрузка...',            en: 'Loading...' },
  admin_product_col:  { ky: 'Товар',                 ru: 'Товар',                  en: 'Product' },
  admin_actions:      { ky: 'Иштер',                 ru: 'Действия',               en: 'Actions' },
  admin_customer:     { ky: 'Кардар',                ru: 'Клиент',                 en: 'Customer' },
  admin_phone:        { ky: 'Телефон',               ru: 'Телефон',                en: 'Phone' },
  admin_address:      { ky: 'Дарек',                 ru: 'Адрес',                  en: 'Address' },
  admin_amount:       { ky: 'Сумма',                 ru: 'Сумма',                  en: 'Amount' },
  admin_status:       { ky: 'Статус',                ru: 'Статус',                 en: 'Status' },
  admin_no_orders:    { ky: 'Заказдар азырынча жок', ru: 'Заказов пока нет',       en: 'No orders yet' },
  admin_name_col:     { ky: 'Аты-жөнү',              ru: 'Имя',                    en: 'Name' },
  admin_role:         { ky: 'Роль',                  ru: 'Роль',                   en: 'Role' },

  // ── Доп. ключи для корректного перевода ─────────────────────────────────
  // Лейбл поля "Оценка" в форме отзыва (отдельно от опции сортировки)
  rating_label:      { ky: 'Баа',          ru: 'Оценка',            en: 'Rating' },
  // Роли пользователей
  role_admin:        { ky: 'Администратор', ru: 'Администратор',     en: 'Admin' },
  role_user:         { ky: 'Колдонуучу',   ru: 'Пользователь',      en: 'User' },
  // Статусы заказов
  status_new:        { ky: 'Жаңы',         ru: 'Новый',             en: 'New' },
  status_processing: { ky: 'Иштетилүүдө', ru: 'В обработке',       en: 'Processing' },
  status_confirmed:  { ky: 'Тастыкталды',  ru: 'Подтверждён',       en: 'Confirmed' },
  status_done:       { ky: 'Аяктады',      ru: 'Выполнен',          en: 'Done' },
  status_cancelled:  { ky: 'Жокко чыгарылды', ru: 'Отменён',        en: 'Cancelled' },
  // Логотип
  logo_name:         { ky: 'МАНАС ЭПОСУ',  ru: 'МАНАС ЭПОСУ',       en: 'MANAS EPIC' },
  // Категории на трёх языках для select в AdminProductForm
  cat_books_short:   { ky: 'Китептер',     ru: 'Книги',             en: 'Books' },
  cat_sov_short:     { ky: 'Сувенирлер',   ru: 'Сувениры',          en: 'Souvenirs' },
  cat_cloth_short:   { ky: 'Кийим',        ru: 'Одежда',            en: 'Clothing' },
  cat_music_short:   { ky: 'Музыка',       ru: 'Музыка',            en: 'Music' },
  // Поле "Actions" в таблице
  admin_actions_col: { ky: 'Иштер',        ru: 'Действия',          en: 'Actions' },
  // Текст "Manas Admin" (бренд в сайдбаре)
  admin_brand:       { ky: 'Манас Админ',  ru: 'Манас Админ',       en: 'Manas Admin' },

  // ── Главная страница — приветственный блок ────────────────────────────────
  welcome_tag:    { ky: 'КЫРГЫЗ ЭЛИНИН УЛУУ МУРАСЫ', ru: 'ВЕЛИКОЕ НАСЛЕДИЕ КЫРГЫЗСКОГО НАРОДА', en: 'GREAT HERITAGE OF THE KYRGYZ PEOPLE' },
  welcome_greet:  { ky: 'Кош келиңиз!', ru: 'Добро пожаловать!', en: 'Welcome!' },
  welcome_sub:    { ky: '«Манас» эпосу дүйнөсүнө', ru: 'В мир эпоса «Манас»', en: 'To the world of the epic "Manas"' },
  welcome_desc:   { ky: 'Кыргыз элинин тарыхын, баатырдыгын, каада-салтын жана руханий мурасын биз менен бирге таанып-билиңиз!', ru: 'Откройте для себя историю, героизм, традиции и духовное наследие кыргызского народа вместе с нами!', en: 'Discover the history, heroism, traditions and spiritual heritage of the Kyrgyz people together with us!' },
  welcome_btn:    { ky: 'Саякатты баштоо →', ru: 'Начать путешествие →', en: 'Start Journey →' },

  // ── Книги — детальная страница ────────────────────────────────────────────
  book_chapters:  { ky: 'Мазмуну / Бөлүмдөр', ru: 'Содержание / Главы', en: 'Contents / Chapters' },
  book_want_read: { ky: 'Бул китепти окугум келет', ru: 'Хочу прочитать эту книгу', en: 'I want to read this book' },
  book_wanted:    { ky: '✓ Тизмеге кошулду!', ru: '✓ Добавлено в список!', en: '✓ Added to reading list!' },
  book_about:     { ky: 'Китеп жөнүндө', ru: 'О книге', en: 'About the book' },
  book_details:   { ky: 'Чоо-жай', ru: 'Подробности', en: 'Details' },
  book_author:    { ky: 'Автор / Манасчы', ru: 'Автор / Манасчи', en: 'Author / Manaschi' },
  book_year:      { ky: 'Жыл', ru: 'Год', en: 'Year' },
  book_pages:     { ky: 'Барактар', ru: 'Страниц', en: 'Pages' },
  book_genre:     { ky: 'Жанр', ru: 'Жанр', en: 'Genre' },
  book_genre_val: { ky: 'Баатырдык эпос', ru: 'Героический эпос', en: 'Heroic epic' },
  book_lang:      { ky: 'Тил', ru: 'Язык', en: 'Language' },

  // ── Книги и музыка ────────────────────────────────────────────────────────
  book_collection:     { ky: 'Китептер жана музыка', ru: 'Книги и музыка', en: 'Books and music' },
  book_collection_desc: {
    ky: 'Манас эпосу тууралуу классикалык китептер, поэтикалык чыңалуулар жана кыргыз музыкасынын бай мурасы.',
    ru: 'Классические книги о эпосе Манас, поэтические произведения и богатое музыкальное наследие кыргызов.',
    en: 'Classic books about the Manas epic, poetic works, and the rich musical heritage of the Kyrgyz people.',
  },
  book_classics:       { ky: 'Классикалык китептер', ru: 'Классические книги', en: 'Classic books' },
  book_epic_library:   { ky: 'Манас китептикана', ru: 'Библиотека Манаса', en: 'Manas library' },
  book_poetry:         { ky: 'Поэзия жана ырлар', ru: 'Поэзия и песни', en: 'Poetry and songs' },
  music_title:         { ky: 'Кыргыз музыкасы', ru: 'Кыргызская музыка', en: 'Kyrgyz music' },
  music_collection:    { ky: 'Этно, классика жана ырлар', ru: 'Этно, классика и песни', en: 'Ethno, classic and songs' },
  music_listen:        { ky: 'Музыканы тыңдоо', ru: 'Слушать музыку', en: 'Listen to music' },
  music_folk:          { ky: 'Элдик ырлар', ru: 'Народные песни', en: 'Folk songs' },
  music_instrumental:   { ky: 'Инструменталдык көйүүлөр', ru: 'Инструментальная музыка', en: 'Instrumental music' },
  music_legendary:     { ky: 'Эпостук ырлар', ru: 'Эпические песни', en: 'Epic songs' },

  // ── Авторизация — страна, телефон ─────────────────────────────────────────
  auth_country:       { ky: 'Өлкө',                    ru: 'Страна',                         en: 'Country' },
  auth_phone:         { ky: 'Телефон номери',           ru: 'Номер телефона',                 en: 'Phone number' },
  auth_phone_ph:      { ky: 'Телефонуңузду киргизиңиз', ru: 'Введите номер телефона',         en: 'Enter your phone number' },
  auth_country_ph:    { ky: 'Өлкөнү тандаңыз',         ru: 'Выберите страну',                en: 'Select country' },
  auth_search_country:{ ky: 'Өлкө издөө...',           ru: 'Поиск страны...',               en: 'Search country...' },
  auth_passport:      { ky: 'Паспорттун сүрөтү (милдеттүү эмес)', ru: 'Фото паспорта (необязательно)', en: 'Passport photo (optional)' },
  auth_passport_why:  { ky: 'Эмге паспорт керек?', ru: 'Зачем нужен паспорт?', en: 'Why do we need a passport?' },
  auth_passport_info: { ky: 'Паспорт сүрөтү каттоону ырастоо үчүн гана колдонулат. Маалымат коопсуз сакталат жана үчүнчү тараптарга берилбейт.', ru: 'Фото паспорта используется только для верификации аккаунта. Данные хранятся в защищённом виде и не передаются третьим лицам.', en: 'Passport photo is used only for account verification. Data is stored securely and not shared with third parties.' },
  auth_passport_agree:{ ky: 'Макулмун', ru: 'Согласен', en: 'I agree' },
  auth_upload_photo:  { ky: 'Сүрөт жүктөө', ru: 'Загрузить фото', en: 'Upload photo' },
  auth_take_photo:    { ky: 'Камерадан тартуу', ru: 'Сделать снимок', en: 'Take photo' },
  auth_fill_all:      { ky: 'Сураныч, бардык милдеттүү талааларды толтуруңуз', ru: 'Пожалуйста, заполните все обязательные поля полностью', en: 'Please fill in all required fields completely' },
  auth_continent_asia:  { ky: 'Азия', ru: 'Азия', en: 'Asia' },
  auth_continent_eu:    { ky: 'Европа', ru: 'Европа', en: 'Europe' },
  auth_continent_na:    { ky: 'Түндүк жана Борбордук Америка', ru: 'Северная и Центральная Америка', en: 'North & Central America' },
  auth_continent_sa:    { ky: 'Түштүк Америка', ru: 'Южная Америка', en: 'South America' },
  auth_continent_af:    { ky: 'Африка', ru: 'Африка', en: 'Africa' },
  auth_continent_oc:    { ky: 'Океания', ru: 'Океания', en: 'Oceania' },

  // ── Чат ────────────────────────────────────────────────────────────────────
  chat_title:      { ky: 'Кат алышуу', ru: 'Сообщения', en: 'Messages' },
  chat_admin:      { ky: 'Администратор', ru: 'Администратор', en: 'Administrator' },
  chat_placeholder:{ ky: 'Билдирүү жазыңыз...', ru: 'Напишите сообщение...', en: 'Write a message...' },
  chat_send:       { ky: 'Жөнөтүү', ru: 'Отправить', en: 'Send' },
  chat_empty:      { ky: 'Билдирүүлөр жок. Биринчи суроону жазыңыз!', ru: 'Сообщений нет. Напишите первый вопрос!', en: 'No messages. Write your first question!' },
  chat_login_req:  { ky: 'Чат колдонуу үчүн кириңиз', ru: 'Войдите, чтобы использовать чат', en: 'Sign in to use the chat' },
  chat_new_badge:  { ky: 'Жаңы', ru: 'Новое', en: 'New' },
  chat_you:        { ky: 'Сиз', ru: 'Вы', en: 'You' },
  chat_select_user:{ ky: 'Колдонуучуну тандаңыз', ru: 'Выберите пользователя', en: 'Select a user' },
  chat_all_chats:  { ky: 'Бардык сүйлөшүүлөр', ru: 'Все диалоги', en: 'All chats' },
  chat_tab:        { ky: 'Чат', ru: 'Чат', en: 'Chat' },

  // ── Статусы заказов ────────────────────────────────────────────────────────
  order_status_new:       { ky: 'Жаңы',         ru: 'Новый',           en: 'New' },
  order_status_accepted:  { ky: 'Кабыл алынды', ru: 'Принят',          en: 'Accepted' },
  order_status_processing:{ ky: 'Иштетилүүдө',  ru: 'В обработке',     en: 'Processing' },
  order_status_shipped:   { ky: 'Жөнөтүлдү',    ru: 'Отправлен',       en: 'Shipped' },
  order_status_done:      { ky: 'Аяктады',       ru: 'Завершён',        en: 'Completed' },
  order_status_cancelled: { ky: 'Жокко чыгарылды', ru: 'Отменён',      en: 'Cancelled' },
  order_confirm_msg:      { ky: 'Заказыңыз администратор тарабынан кабыл алынды! Сатып алганыңыз үчүн рахмат.', ru: 'Ваш заказ принят администратором! Спасибо за покупку.', en: 'Your order has been accepted by the administrator! Thank you for your purchase.' },
  order_change_status:    { ky: 'Статусту өзгөртүү', ru: 'Изменить статус', en: 'Change status' },
  order_items:            { ky: 'Товарлар', ru: 'Товары', en: 'Items' },
  order_date:             { ky: 'Дата', ru: 'Дата', en: 'Date' },
  order_notify_title:     { ky: 'Заказ жөнүндө билдирүү', ru: 'Уведомление о заказе', en: 'Order notification' },
  order_notification:     { ky: 'Сиздин заказыңыздын статусу өзгөрдү', ru: 'Статус вашего заказа изменился', en: 'Your order status has been updated' },
  notifications:          { ky: 'Билдирүүлөр', ru: 'Уведомления', en: 'Notifications' },
  notif_empty:            { ky: 'Билдирүүлөр жок', ru: 'Нет уведомлений', en: 'No notifications' },
  mark_read:              { ky: 'Окулду', ru: 'Прочитано', en: 'Mark read' },

  // ── Отзывы (admin) ─────────────────────────────────────────────────────────
  admin_reviews_tab:  { ky: 'Пикирлер', ru: 'Отзывы', en: 'Reviews' },
  admin_review_user:  { ky: 'Колдонуучу', ru: 'Пользователь', en: 'User' },
  admin_review_prod:  { ky: 'Товар', ru: 'Товар', en: 'Product' },
  admin_review_date:  { ky: 'Дата', ru: 'Дата', en: 'Date' },
  admin_review_text:  { ky: 'Пикир', ru: 'Отзыв', en: 'Review' },
  admin_review_del:   { ky: 'Жок кылуу', ru: 'Удалить', en: 'Delete' },
  admin_no_reviews:   { ky: 'Пикирлер жок', ru: 'Отзывов нет', en: 'No reviews' },
  admin_stats_tab:    { ky: 'Статистика', ru: 'Статистика', en: 'Statistics' },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer_tagline: {
    ky: 'Улуттук мурас — биздин келечегибиз!',
    ru: 'Национальное наследие — наше будущее!',
    en: 'National heritage — our future!',
  },
  footer_horse: { ky: 'Манастын тулпары', ru: 'Конь Манаса', en: "Manas's Horse" },
  footer_facts: { ky: 'Кызыктуу маалыматтар', ru: 'Интересные факты', en: 'Interesting Facts' },

  // ── Валидация телефона и адреса ──────────────────────────────────────────
  phone_invalid:     { ky: 'Сураныч, туура жана толук телефон номерин киргизиңиз', ru: 'Пожалуйста, введите полный и правильный номер телефона', en: 'Please enter a complete and valid phone number' },
  phone_required:    { ky: 'Телефон номери талап кылынат', ru: 'Номер телефона обязателен', en: 'Phone number is required' },
  address_required:  { ky: 'Сураныч, дарегиңизди толук жазыңыз', ru: 'Пожалуйста, заполните адрес полностью', en: 'Please fill in the address completely' },
  name_required:     { ky: 'Атыңызды киргизиңиз', ru: 'Введите ваше имя', en: 'Please enter your name' },
  fill_all_fields:   { ky: 'Сураныч, бардык милдеттүү талааларды толтуруңуз', ru: 'Пожалуйста, заполните все обязательные поля', en: 'Please fill in all required fields' },
  pass_min_6:        { ky: 'Сырсөз жок дегенде 6 белгиден турушу керек', ru: 'Пароль должен содержать минимум 6 символов', en: 'Password must be at least 6 characters' },
  phone_digits:      { ky: 'сан', ru: 'цифр', en: 'digits' },
  search_no_result:  { ky: 'Табылган жок', ru: 'Не найдено', en: 'No results' },
  search_country:    { ky: 'Өлкө издөө...', ru: 'Поиск страны...', en: 'Search country...' },
  age_label:         { ky: 'Жашы:', ru: 'Возраст:', en: 'Age:' },

  // ── Кнопка «Назад» для разных страниц ────────────────────────────────────
  go_back:           { ky: '← Башкы бетке', ru: '← На главную', en: '← Home' },
  no_results_found:  { ky: 'Жыйынтык табылган жок', ru: 'Результаты не найдены', en: 'No results found' },

  // ── Admin reviews ─────────────────────────────────────────────────────────
  admin_no_reviews:  { ky: 'Пикирлер жок', ru: 'Отзывов нет', en: 'No reviews' },
  admin_stock:       { ky: 'Запас', ru: 'Склад', en: 'Stock' },
  admin_overview:    { ky: 'Дүкөндүн сереп-жобосу', ru: 'Обзор магазина', en: 'Store overview' },
  admin_customer:    { ky: 'Кардар', ru: 'Клиент', en: 'Customer' },
  admin_phone:       { ky: 'Телефон', ru: 'Телефон', en: 'Phone' },
  admin_address:     { ky: 'Дарек', ru: 'Адрес', en: 'Address' },
  admin_amount:      { ky: 'Сумма', ru: 'Сумма', en: 'Amount' },
  admin_loading:     { ky: 'Жүктөлүүдө...', ru: 'Загрузка...', en: 'Loading...' },
};

export function getProductTitle(product, lang = 'ky') {
  if (!product) return '';

  const rawKy = String(product.title ?? '').trim();
  const rawRu = String(product.titleRu ?? '').trim();
  const rawEn = String(product.titleEn ?? '').trim();

  if (lang === 'ru') return rawRu || rawKy;
  if (lang === 'en') return rawEn || rawRu || rawKy;
  return rawKy || rawRu;
}

/**
 * t('key', lang) → строка перевода
 * Fallback: en → ru → ky → key
 */
export function t(key, lang = 'ky') {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? entry.ru ?? entry.ky ?? key;
}

export default T;
