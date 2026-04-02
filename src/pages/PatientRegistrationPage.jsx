import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';

function PatientRegistrationPage({ doctors, setUsers, users, embedded = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    preferredLanguage: '',
    
    // Contact Information
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    
    // Medical Information
    currentDisease: '',
    
    // Preferred Doctor
    preferredDoctor: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDoctorSchedule, setSelectedDoctorSchedule] = useState(null);
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);

  // Sample doctor availability data with specializations
  const doctorAvailability = {
    'Dr. Maya Patel': {
      specialty: 'General Medicine',
      specialization: 'Internal Medicine & Primary Care',
      availability: ['Mon 9AM-5PM', 'Wed 9AM-5PM', 'Fri 9AM-5PM'],
      nextAvailable: '2026-02-21 09:00 AM',
      rating: '4.8/5',
      experience: '12 years',
      treatsConditions: ['Fever', 'Cold & Flu', 'Diabetes', 'Hypertension', 'General Health'],
    },
    'Dr. John Smith': {
      specialty: 'Cardiology',
      specialization: 'Heart & Cardiovascular Specialist',
      availability: ['Tue 10AM-6PM', 'Thu 10AM-6PM', 'Sat 9AM-1PM'],
      nextAvailable: '2026-02-22 10:00 AM',
      rating: '4.9/5',
      experience: '15 years',
      treatsConditions: ['Heart Disease', 'Chest Pain', 'High Blood Pressure', 'Arrhythmia'],
    },
    'Dr. Sarah Johnson': {
      specialty: 'Pediatrics',
      specialization: 'Child & Adolescent Care',
      availability: ['Mon 8AM-4PM', 'Wed 8AM-4PM', 'Fri 8AM-4PM'],
      nextAvailable: '2026-02-21 08:00 AM',
      rating: '4.7/5',
      experience: '10 years',
      treatsConditions: ['Child Illnesses', 'Vaccinations', 'Growth Issues', 'Allergies'],
    },
    'Dr. Robert Chen': {
      specialty: 'Orthopedics',
      specialization: 'Bone, Joint & Muscle Specialist',
      availability: ['Mon 10AM-6PM', 'Thu 10AM-6PM'],
      nextAvailable: '2026-02-21 10:00 AM',
      rating: '4.8/5',
      experience: '14 years',
      treatsConditions: ['Fractures', 'Back Pain', 'Sports Injuries', 'Arthritis'],
    },
    'Dr. Emily Williams': {
      specialty: 'Dermatology',
      specialization: 'Skin, Hair & Nail Specialist',
      availability: ['Tue 9AM-5PM', 'Fri 9AM-5PM'],
      nextAvailable: '2026-02-22 09:00 AM',
      rating: '4.9/5',
      experience: '11 years',
      treatsConditions: ['Acne', 'Eczema', 'Skin Cancer', 'Hair Loss', 'Psoriasis'],
    },
    'Dr. Michael Brown': {
      specialty: 'Neurology',
      specialization: 'Brain & Nervous System Specialist',
      availability: ['Wed 10AM-6PM', 'Sat 10AM-2PM'],
      nextAvailable: '2026-02-22 10:00 AM',
      rating: '4.8/5',
      experience: '16 years',
      treatsConditions: ['Headaches', 'Seizures', 'Stroke', 'Parkinson\'s', 'Memory Issues'],
    },
    'Dr. Lisa Anderson': {
      specialty: 'Psychiatry',
      specialization: 'Mental Health Specialist',
      availability: ['Mon 9AM-7PM', 'Thu 9AM-7PM'],
      nextAvailable: '2026-02-21 09:00 AM',
      rating: '4.7/5',
      experience: '13 years',
      treatsConditions: ['Depression', 'Anxiety', 'PTSD', 'Bipolar Disorder', 'Stress'],
    },
    'Dr. David Lee': {
      specialty: 'Gastroenterology',
      specialization: 'Digestive System Specialist',
      availability: ['Tue 8AM-4PM', 'Fri 8AM-4PM'],
      nextAvailable: '2026-02-22 08:00 AM',
      rating: '4.8/5',
      experience: '12 years',
      treatsConditions: ['IBS', 'Acid Reflux', 'Liver Disease', 'Ulcers', 'Colitis'],
    },
  };

  const uiTranslations = {
    en: {
      patientRegistrationForm: 'Patient Registration Form',
      personalInformation: 'Personal Information',
      contactInformation: 'Contact Information',
      emergencyContact: 'Emergency Contact',
      medicalInformation: 'Medical Information',
      doctorPreference: 'Doctor Preference',
      firstName: 'First Name *',
      lastName: 'Last Name *',
      dateOfBirth: 'Date of Birth *',
      gender: 'Gender *',
      bloodType: 'Blood Type',
      preferredLanguage: 'Preferred Language *',
      phoneNumber: 'Phone Number *',
      emailAddress: 'Email Address *',
      password: 'Password *',
      confirmPassword: 'Confirm Password *',
      streetAddress: 'Street Address *',
      city: 'City *',
      state: 'State *',
      zipCode: 'ZIP Code *',
      contactName: 'Contact Name *',
      relationship: 'Relationship *',
      diseaseQuestion: 'What disease/condition are you suffering from? *',
      preferredDoctor: 'Preferred Doctor',
      selectGender: 'Select Gender',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      preferNotToSay: 'Prefer not to say',
      selectBloodType: 'Select Blood Type',
      selectLanguage: 'Select Language',
      selectDoctor: 'Select a doctor (optional)',
      phonePlaceholder: '+1-555-0123',
      emailPlaceholder: 'patient@email.com',
      passwordPlaceholder: 'At least 8 characters',
      confirmPasswordPlaceholder: 'Re-enter your password',
      addressPlaceholder: '123 Main Street',
      relationshipPlaceholder: 'Spouse, Parent, etc.',
      diseasePlaceholder: 'Describe your current health condition or symptoms...',
      completeRegistration: 'Complete Registration',
    },
    es: {
      patientRegistrationForm: 'Formulario de Registro de Paciente',
      personalInformation: 'Información Personal',
      contactInformation: 'Información de Contacto',
      emergencyContact: 'Contacto de Emergencia',
      medicalInformation: 'Información Médica',
      doctorPreference: 'Preferencia de Médico',
      firstName: 'Nombre *',
      lastName: 'Apellido *',
      dateOfBirth: 'Fecha de Nacimiento *',
      gender: 'Género *',
      bloodType: 'Tipo de Sangre',
      preferredLanguage: 'Idioma Preferido *',
      phoneNumber: 'Número de Teléfono *',
      emailAddress: 'Correo Electrónico *',
      streetAddress: 'Dirección *',
      city: 'Ciudad *',
      state: 'Estado *',
      zipCode: 'Código Postal *',
      contactName: 'Nombre del Contacto *',
      relationship: 'Relación *',
      diseaseQuestion: '¿Qué enfermedad/condición padece? *',
      preferredDoctor: 'Médico Preferido',
      selectGender: 'Seleccione Género',
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
      preferNotToSay: 'Prefiero no decirlo',
      selectBloodType: 'Seleccione Tipo de Sangre',
      selectLanguage: 'Seleccione Idioma',
      selectDoctor: 'Seleccione un médico (opcional)',
      phonePlaceholder: '+34-600-123-456',
      emailPlaceholder: 'paciente@email.com',
      addressPlaceholder: '123 Calle Principal',
      relationshipPlaceholder: 'Cónyuge, Padre/Madre, etc.',
      diseasePlaceholder: 'Describa su condición o síntomas actuales...',
      completeRegistration: 'Completar Registro',
    },
    fr: {
      patientRegistrationForm: 'Formulaire d’Inscription Patient',
      personalInformation: 'Informations Personnelles',
      contactInformation: 'Coordonnées',
      emergencyContact: 'Contact d’Urgence',
      medicalInformation: 'Informations Médicales',
      doctorPreference: 'Préférence du Médecin',
      firstName: 'Prénom *',
      lastName: 'Nom *',
      dateOfBirth: 'Date de Naissance *',
      gender: 'Sexe *',
      bloodType: 'Groupe Sanguin',
      preferredLanguage: 'Langue Préférée *',
      phoneNumber: 'Numéro de Téléphone *',
      emailAddress: 'Adresse E-mail *',
      streetAddress: 'Adresse *',
      city: 'Ville *',
      state: 'État/Région *',
      zipCode: 'Code Postal *',
      contactName: 'Nom du Contact *',
      relationship: 'Lien *',
      diseaseQuestion: 'De quelle maladie/condition souffrez-vous ? *',
      preferredDoctor: 'Médecin Préféré',
      selectGender: 'Sélectionnez le Sexe',
      male: 'Homme',
      female: 'Femme',
      other: 'Autre',
      preferNotToSay: 'Préfère ne pas répondre',
      selectBloodType: 'Sélectionnez le Groupe Sanguin',
      selectLanguage: 'Sélectionnez la Langue',
      selectDoctor: 'Sélectionnez un médecin (optionnel)',
      phonePlaceholder: '+33-6-12-34-56-78',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '123 Rue Principale',
      relationshipPlaceholder: 'Conjoint, Parent, etc.',
      diseasePlaceholder: 'Décrivez votre état de santé ou vos symptômes...',
      completeRegistration: 'Terminer l’Inscription',
    },
    de: {
      patientRegistrationForm: 'Patientenregistrierungsformular',
      personalInformation: 'Persönliche Informationen',
      contactInformation: 'Kontaktinformationen',
      emergencyContact: 'Notfallkontakt',
      medicalInformation: 'Medizinische Informationen',
      doctorPreference: 'Arztpräferenz',
      firstName: 'Vorname *',
      lastName: 'Nachname *',
      dateOfBirth: 'Geburtsdatum *',
      gender: 'Geschlecht *',
      bloodType: 'Blutgruppe',
      preferredLanguage: 'Bevorzugte Sprache *',
      phoneNumber: 'Telefonnummer *',
      emailAddress: 'E-Mail-Adresse *',
      streetAddress: 'Straßenadresse *',
      city: 'Stadt *',
      state: 'Bundesland *',
      zipCode: 'Postleitzahl *',
      contactName: 'Kontaktname *',
      relationship: 'Beziehung *',
      diseaseQuestion: 'An welcher Krankheit/Beschwerde leiden Sie? *',
      preferredDoctor: 'Bevorzugter Arzt',
      selectGender: 'Geschlecht auswählen',
      male: 'Männlich',
      female: 'Weiblich',
      other: 'Andere',
      preferNotToSay: 'Keine Angabe',
      selectBloodType: 'Blutgruppe auswählen',
      selectLanguage: 'Sprache auswählen',
      selectDoctor: 'Arzt auswählen (optional)',
      phonePlaceholder: '+49-170-1234567',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: 'Hauptstraße 123',
      relationshipPlaceholder: 'Ehepartner, Elternteil usw.',
      diseasePlaceholder: 'Beschreiben Sie Ihre aktuellen Symptome...',
      completeRegistration: 'Registrierung Abschließen',
    },
    zh: {
      patientRegistrationForm: '患者注册表',
      personalInformation: '个人信息',
      contactInformation: '联系信息',
      emergencyContact: '紧急联系人',
      medicalInformation: '医疗信息',
      doctorPreference: '医生偏好',
      firstName: '名字 *',
      lastName: '姓氏 *',
      dateOfBirth: '出生日期 *',
      gender: '性别 *',
      bloodType: '血型',
      preferredLanguage: '首选语言 *',
      phoneNumber: '电话号码 *',
      emailAddress: '电子邮箱 *',
      streetAddress: '街道地址 *',
      city: '城市 *',
      state: '省/州 *',
      zipCode: '邮政编码 *',
      contactName: '联系人姓名 *',
      relationship: '关系 *',
      diseaseQuestion: '您目前患有什么疾病/症状？*',
      preferredDoctor: '首选医生',
      selectGender: '选择性别',
      male: '男',
      female: '女',
      other: '其他',
      preferNotToSay: '不愿透露',
      selectBloodType: '选择血型',
      selectLanguage: '选择语言',
      selectDoctor: '选择医生（可选）',
      phonePlaceholder: '+86-138-0000-0000',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '主街123号',
      relationshipPlaceholder: '配偶、父母等',
      diseasePlaceholder: '请描述您的健康状况或症状...',
      completeRegistration: '完成注册',
    },
    hi: {
      patientRegistrationForm: 'रोगी पंजीकरण फ़ॉर्म',
      personalInformation: 'व्यक्तिगत जानकारी',
      contactInformation: 'संपर्क जानकारी',
      emergencyContact: 'आपातकालीन संपर्क',
      medicalInformation: 'चिकित्सीय जानकारी',
      doctorPreference: 'डॉक्टर पसंद',
      firstName: 'पहला नाम *',
      lastName: 'अंतिम नाम *',
      dateOfBirth: 'जन्म तिथि *',
      gender: 'लिंग *',
      bloodType: 'रक्त समूह',
      preferredLanguage: 'पसंदीदा भाषा *',
      phoneNumber: 'फ़ोन नंबर *',
      emailAddress: 'ईमेल पता *',
      password: 'पासवर्ड *',
      confirmPassword: 'पासवर्ड की पुष्टि करें *',
      streetAddress: 'पता *',
      city: 'शहर *',
      state: 'राज्य *',
      zipCode: 'पिन कोड *',
      contactName: 'संपर्क नाम *',
      relationship: 'संबंध *',
      diseaseQuestion: 'आप किस बीमारी/स्थिति से पीड़ित हैं? *',
      preferredDoctor: 'पसंदीदा डॉक्टर',
      selectGender: 'लिंग चुनें',
      male: 'पुरुष',
      female: 'महिला',
      other: 'अन्य',
      preferNotToSay: 'न बताना चाहें',
      selectBloodType: 'रक्त समूह चुनें',
      selectLanguage: 'भाषा चुनें',
      selectDoctor: 'डॉक्टर चुनें (वैकल्पिक)',
      phonePlaceholder: '+91-98765-43210',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '123 मुख्य सड़क',
      relationshipPlaceholder: 'पति/पत्नी, माता/पिता आदि',
      diseasePlaceholder: 'अपनी स्वास्थ्य समस्या या लक्षण बताइए...',
      completeRegistration: 'पंजीकरण पूरा करें',
    },
    ar: {
      patientRegistrationForm: 'نموذج تسجيل المريض',
      personalInformation: 'المعلومات الشخصية',
      contactInformation: 'معلومات الاتصال',
      emergencyContact: 'جهة اتصال للطوارئ',
      medicalInformation: 'المعلومات الطبية',
      doctorPreference: 'تفضيل الطبيب',
      firstName: 'الاسم الأول *',
      lastName: 'اسم العائلة *',
      dateOfBirth: 'تاريخ الميلاد *',
      gender: 'الجنس *',
      bloodType: 'فصيلة الدم',
      preferredLanguage: 'اللغة المفضلة *',
      phoneNumber: 'رقم الهاتف *',
      emailAddress: 'البريد الإلكتروني *',
      password: 'كلمة المرور *',
      confirmPassword: 'تأكيد كلمة المرور *',
      streetAddress: 'العنوان *',
      city: 'المدينة *',
      state: 'الولاية *',
      zipCode: 'الرمز البريدي *',
      contactName: 'اسم جهة الاتصال *',
      relationship: 'صلة القرابة *',
      diseaseQuestion: 'ما المرض/الحالة التي تعاني منها؟ *',
      preferredDoctor: 'الطبيب المفضل',
      selectGender: 'اختر الجنس',
      male: 'ذكر',
      female: 'أنثى',
      other: 'أخرى',
      preferNotToSay: 'أفضل عدم الإفصاح',
      selectBloodType: 'اختر فصيلة الدم',
      selectLanguage: 'اختر اللغة',
      selectDoctor: 'اختر طبيبًا (اختياري)',
      phonePlaceholder: '+966-5-1234-5678',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '123 الشارع الرئيسي',
      relationshipPlaceholder: 'زوج/زوجة، والد/والدة، إلخ',
      diseasePlaceholder: 'صف حالتك الصحية أو الأعراض...',
      completeRegistration: 'إكمال التسجيل',
    },
    pt: {
      patientRegistrationForm: 'Formulário de Registro do Paciente',
      personalInformation: 'Informações Pessoais',
      contactInformation: 'Informações de Contato',
      emergencyContact: 'Contato de Emergência',
      medicalInformation: 'Informações Médicas',
      doctorPreference: 'Preferência de Médico',
      firstName: 'Nome *',
      lastName: 'Sobrenome *',
      dateOfBirth: 'Data de Nascimento *',
      gender: 'Gênero *',
      bloodType: 'Tipo Sanguíneo',
      preferredLanguage: 'Idioma Preferido *',
      phoneNumber: 'Número de Telefone *',
      emailAddress: 'E-mail *',
      streetAddress: 'Endereço *',
      city: 'Cidade *',
      state: 'Estado *',
      zipCode: 'CEP *',
      contactName: 'Nome do Contato *',
      relationship: 'Parentesco *',
      diseaseQuestion: 'Qual doença/condição você está enfrentando? *',
      preferredDoctor: 'Médico Preferido',
      selectGender: 'Selecione o Gênero',
      male: 'Masculino',
      female: 'Feminino',
      other: 'Outro',
      preferNotToSay: 'Prefiro não informar',
      selectBloodType: 'Selecione o Tipo Sanguíneo',
      selectLanguage: 'Selecione o Idioma',
      selectDoctor: 'Selecione um médico (opcional)',
      phonePlaceholder: '+55-11-91234-5678',
      emailPlaceholder: 'paciente@email.com',
      addressPlaceholder: 'Rua Principal, 123',
      relationshipPlaceholder: 'Cônjuge, Pai/Mãe etc.',
      diseasePlaceholder: 'Descreva sua condição ou sintomas...',
      completeRegistration: 'Concluir Registro',
    },
    ru: {
      patientRegistrationForm: 'Форма Регистрации Пациента',
      personalInformation: 'Личная Информация',
      contactInformation: 'Контактная Информация',
      emergencyContact: 'Экстренный Контакт',
      medicalInformation: 'Медицинская Информация',
      doctorPreference: 'Предпочтение Врача',
      firstName: 'Имя *',
      lastName: 'Фамилия *',
      dateOfBirth: 'Дата Рождения *',
      gender: 'Пол *',
      bloodType: 'Группа Крови',
      preferredLanguage: 'Предпочитаемый Язык *',
      phoneNumber: 'Номер Телефона *',
      emailAddress: 'Эл. Почта *',
      streetAddress: 'Адрес *',
      city: 'Город *',
      state: 'Регион *',
      zipCode: 'Индекс *',
      contactName: 'Имя Контакта *',
      relationship: 'Родство *',
      diseaseQuestion: 'Каким заболеванием/состоянием вы страдаете? *',
      preferredDoctor: 'Предпочитаемый Врач',
      selectGender: 'Выберите Пол',
      male: 'Мужской',
      female: 'Женский',
      other: 'Другое',
      preferNotToSay: 'Предпочитаю не указывать',
      selectBloodType: 'Выберите Группу Крови',
      selectLanguage: 'Выберите Язык',
      selectDoctor: 'Выберите врача (необязательно)',
      phonePlaceholder: '+7-900-123-45-67',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: 'ул. Главная, 123',
      relationshipPlaceholder: 'Супруг(а), родитель и т.д.',
      diseasePlaceholder: 'Опишите ваше состояние или симптомы...',
      completeRegistration: 'Завершить Регистрацию',
    },
    ja: {
      patientRegistrationForm: '患者登録フォーム',
      personalInformation: '個人情報',
      contactInformation: '連絡先情報',
      emergencyContact: '緊急連絡先',
      medicalInformation: '医療情報',
      doctorPreference: '医師の希望',
      firstName: '名 *',
      lastName: '姓 *',
      dateOfBirth: '生年月日 *',
      gender: '性別 *',
      bloodType: '血液型',
      preferredLanguage: '希望言語 *',
      phoneNumber: '電話番号 *',
      emailAddress: 'メールアドレス *',
      streetAddress: '住所 *',
      city: '市区町村 *',
      state: '都道府県 *',
      zipCode: '郵便番号 *',
      contactName: '連絡先氏名 *',
      relationship: '続柄 *',
      diseaseQuestion: '現在の病気・症状は何ですか？ *',
      preferredDoctor: '希望する医師',
      selectGender: '性別を選択',
      male: '男性',
      female: '女性',
      other: 'その他',
      preferNotToSay: '回答しない',
      selectBloodType: '血液型を選択',
      selectLanguage: '言語を選択',
      selectDoctor: '医師を選択（任意）',
      phonePlaceholder: '+81-90-1234-5678',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: 'メイン通り123',
      relationshipPlaceholder: '配偶者、親 など',
      diseasePlaceholder: '現在の症状や体調を入力してください...',
      completeRegistration: '登録を完了',
    },
    te: {
      patientRegistrationForm: 'రోగి నమోదు ఫారం',
      personalInformation: 'వ్యక్తిగత సమాచారం',
      contactInformation: 'సంప్రదింపు సమాచారం',
      emergencyContact: 'అత్యవసర సంప్రదింపు',
      medicalInformation: 'వైద్య సమాచారం',
      doctorPreference: 'వైద్యుడి ఎంపిక',
      firstName: 'మొదటి పేరు *',
      lastName: 'చివరి పేరు *',
      dateOfBirth: 'పుట్టిన తేదీ *',
      gender: 'లింగం *',
      bloodType: 'రక్త గ్రూప్',
      preferredLanguage: 'ఇష్ట భాష *',
      phoneNumber: 'ఫోన్ నంబర్ *',
      emailAddress: 'ఇమెయిల్ చిరునామా *',
      streetAddress: 'వీధి చిరునామా *',
      city: 'నగరం *',
      state: 'రాష్ట్రం *',
      zipCode: 'పిన్ కోడ్ *',
      contactName: 'సంప్రదింపు పేరు *',
      relationship: 'సంబంధం *',
      diseaseQuestion: 'మీరు ఏ వ్యాధి/లక్షణాలతో బాధపడుతున్నారు? *',
      preferredDoctor: 'ఇష్టమైన వైద్యుడు',
      selectGender: 'లింగాన్ని ఎంచుకోండి',
      male: 'పురుషుడు',
      female: 'స్త్రీ',
      other: 'ఇతరులు',
      preferNotToSay: 'చెప్పదల్చుకోలేదు',
      selectBloodType: 'రక్త గ్రూప్ ఎంచుకోండి',
      selectLanguage: 'భాషను ఎంచుకోండి',
      selectDoctor: 'వైద్యుడిని ఎంచుకోండి (ఐచ్చికం)',
      phonePlaceholder: '+91-98765-43210',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '123 మెయిన్ స్ట్రీట్',
      relationshipPlaceholder: 'భార్య/భర్త, తల్లి/తండ్రి మొదలైనవి',
      diseasePlaceholder: 'మీ ఆరోగ్య సమస్యలు లేదా లక్షణాలను వివరించండి...',
      completeRegistration: 'నమోదు పూర్తి చేయండి',
    },
    ta: {
      patientRegistrationForm: 'நோயாளர் பதிவு படிவம்',
      personalInformation: 'தனிப்பட்ட தகவல்',
      contactInformation: 'தொடர்பு தகவல்',
      emergencyContact: 'அவசர தொடர்பு',
      medicalInformation: 'மருத்துவ தகவல்',
      doctorPreference: 'மருத்துவர் விருப்பம்',
      firstName: 'முதல் பெயர் *',
      lastName: 'கடைசி பெயர் *',
      dateOfBirth: 'பிறந்த தேதி *',
      gender: 'பாலினம் *',
      bloodType: 'இரத்த வகை',
      preferredLanguage: 'விருப்ப மொழி *',
      phoneNumber: 'தொலைபேசி எண் *',
      emailAddress: 'மின்னஞ்சல் *',
      streetAddress: 'முகவரி *',
      city: 'நகர் *',
      state: 'மாநிலம் *',
      zipCode: 'அஞ்சல் குறியீடு *',
      contactName: 'தொடர்பு பெயர் *',
      relationship: 'உறவு *',
      diseaseQuestion: 'நீங்கள் எந்த நோய்/அறிகுறியால் பாதிக்கப்பட்டுள்ளீர்கள்? *',
      preferredDoctor: 'விருப்ப மருத்துவர்',
      selectGender: 'பாலினத்தைத் தேர்ந்தெடுக்கவும்',
      male: 'ஆண்',
      female: 'பெண்',
      other: 'மற்றவை',
      preferNotToSay: 'சொல்ல விருப்பமில்லை',
      selectBloodType: 'இரத்த வகையைத் தேர்ந்தெடுக்கவும்',
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      selectDoctor: 'மருத்துவரைத் தேர்ந்தெடுக்கவும் (விருப்பம்)',
      phonePlaceholder: '+91-98765-43210',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '123 மேயின் தெரு',
      relationshipPlaceholder: 'மனைவி/கணவர், பெற்றோர் போன்றோர்',
      diseasePlaceholder: 'உங்கள் உடல்நிலை/அறிகுறிகளை விளக்கவும்...',
      completeRegistration: 'பதிவை முடிக்கவும்',
    },
    bn: {
      patientRegistrationForm: 'রোগী নিবন্ধন ফর্ম',
      personalInformation: 'ব্যক্তিগত তথ্য',
      contactInformation: 'যোগাযোগের তথ্য',
      emergencyContact: 'জরুরি যোগাযোগ',
      medicalInformation: 'চিকিৎসা তথ্য',
      doctorPreference: 'ডাক্তারের পছন্দ',
      firstName: 'নামের প্রথম অংশ *',
      lastName: 'নামের শেষ অংশ *',
      dateOfBirth: 'জন্মতারিখ *',
      gender: 'লিঙ্গ *',
      bloodType: 'রক্তের গ্রুপ',
      preferredLanguage: 'পছন্দের ভাষা *',
      phoneNumber: 'ফোন নম্বর *',
      emailAddress: 'ইমেইল ঠিকানা *',
      streetAddress: 'রাস্তার ঠিকানা *',
      city: 'শহর *',
      state: 'রাজ্য *',
      zipCode: 'পোস্ট কোড *',
      contactName: 'যোগাযোগের নাম *',
      relationship: 'সম্পর্ক *',
      diseaseQuestion: 'আপনি কোন রোগ/সমস্যায় ভুগছেন? *',
      preferredDoctor: 'পছন্দের ডাক্তার',
      selectGender: 'লিঙ্গ নির্বাচন করুন',
      male: 'পুরুষ',
      female: 'মহিলা',
      other: 'অন্যান্য',
      preferNotToSay: 'বলতে চাই না',
      selectBloodType: 'রক্তের গ্রুপ নির্বাচন করুন',
      selectLanguage: 'ভাষা নির্বাচন করুন',
      selectDoctor: 'ডাক্তার নির্বাচন করুন (ঐচ্ছিক)',
      phonePlaceholder: '+880-1712-345678',
      emailPlaceholder: 'patient@email.com',
      addressPlaceholder: '১২৩ মেইন স্ট্রিট',
      relationshipPlaceholder: 'স্বামী/স্ত্রী, পিতা/মাতা ইত্যাদি',
      diseasePlaceholder: 'আপনার বর্তমান সমস্যা বা উপসর্গ লিখুন...',
      completeRegistration: 'নিবন্ধন সম্পূর্ণ করুন',
    },
  };

  const languageCodeMap = {
    English: 'en',
    Spanish: 'es',
    French: 'fr',
    German: 'de',
    'Mandarin Chinese': 'zh',
    Hindi: 'hi',
    Arabic: 'ar',
    Portuguese: 'pt',
    Russian: 'ru',
    Japanese: 'ja',
    Telugu: 'te',
    Tamil: 'ta',
    Bengali: 'bn',
    Other: 'en',
  };

  const activeLanguage = languageCodeMap[formData.preferredLanguage] || 'en';
  const t = (key) => uiTranslations[activeLanguage][key] || uiTranslations.en[key] || key;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Auto-suggest doctors based on disease description
    if (field === 'currentDisease' && value.trim().length > 3) {
      const diseaseText = value.toLowerCase();
      const suggestions = [];
      
      Object.entries(doctorAvailability).forEach(([doctorName, info]) => {
        // Check if any of the doctor's treated conditions match the disease description
        const matchingConditions = info.treatsConditions.filter(condition => 
          diseaseText.includes(condition.toLowerCase()) ||
          condition.toLowerCase().includes(diseaseText) ||
          // Also check specialty keywords
          diseaseText.includes(info.specialty.toLowerCase())
        );
        
        // Additional keyword matching for common terms
        let matchScore = matchingConditions.length;
        
        // Keyword mapping for better suggestions
        const keywordMapping = {
          'heart': ['cardiology', 'chest pain', 'blood pressure'],
          'skin': ['dermatology', 'acne', 'rash', 'eczema'],
          'stomach': ['gastroenterology', 'digestion', 'ibs'],
          'head': ['neurology', 'brain', 'migraine'],
          'mental': ['psychiatry', 'depression', 'anxiety'],
          'child': ['pediatrics', 'baby', 'kid'],
          'bone': ['orthopedics', 'fracture', 'joint'],
          'stress': ['psychiatry', 'anxiety', 'mental'],
          'fever': ['general medicine', 'cold', 'flu'],
          'pain': ['general medicine', 'orthopedics'],
        };
        
        Object.entries(keywordMapping).forEach(([keyword, relatedTerms]) => {
          if (diseaseText.includes(keyword)) {
            relatedTerms.forEach(term => {
              if (info.specialty.toLowerCase().includes(term) ||
                  info.specialization.toLowerCase().includes(term) ||
                  info.treatsConditions.some(c => c.toLowerCase().includes(term))) {
                matchScore += 0.5;
              }
            });
          }
        });
        
        if (matchScore > 0) {
          suggestions.push({
            doctorName,
            info,
            matchScore,
            matchingConditions,
          });
        }
      });
      
      // Sort by match score (highest first)
      suggestions.sort((a, b) => b.matchScore - a.matchScore);
      setSuggestedDoctors(suggestions.slice(0, 3)); // Show top 3 suggestions
    } else if (field === 'currentDisease' && value.trim().length <= 3) {
      setSuggestedDoctors([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get stored users from localStorage
    let storedUsers = [];
    try {
      const stored = localStorage.getItem('users');
      storedUsers = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading users from localStorage:', error);
      storedUsers = [];
    }

    const patientEmail = formData.email.toLowerCase().trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      alert('⚠️ Passwords do not match. Please try again.');
      return;
    }
    
    // Validate password length
    if (password.length < 8) {
      alert('⚠️ Password must be at least 8 characters long.');
      return;
    }
    
    // Check for duplicate email
    const emailExists = storedUsers.some(u => 
      u.email && u.email.toLowerCase() === patientEmail
    );
    
    if (emailExists) {
      alert('⚠️ This email is already registered. Please use a different email or login.');
      return;
    }

    // Check if fields are filled
    if (!formData.firstName.trim() || !formData.lastName.trim() || !patientEmail) {
      alert('⚠️ Please fill in First Name, Last Name, and Email.');
      return;
    }
    
    // Create new patient user object with user-provided password
    const newPatient = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'patient',
      status: 'Active',
      contact: formData.phone,
      email: patientEmail,
      password: password, // Store the user's own password
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodType: formData.bloodType,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    };

    // Add new patient to users list and save to localStorage
    const updatedUsers = [...storedUsers, newPatient];
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Failed to save users to localStorage:', error);
      alert('⚠️ Error saving registration. Please try again.');
      return;
    }

    // Also update the React state
    setUsers(updatedUsers);
    
    // Auto-login the newly registered patient
    try {
      localStorage.setItem('currentUser', JSON.stringify({
        name: newPatient.name,
        email: patientEmail,
        role: 'patient',
        password: password,
      }));
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem('activeRole', JSON.stringify('patient'));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
    
    // Show success message and redirect to dashboard
    setShowSuccess(true);
    
    // Redirect after a short delay to show success message
    setTimeout(() => {
      navigate('/patient/dashboard', { replace: true });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ✓ Patient registration completed successfully! Welcome to our medical system.
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl">
        <section className="overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 shadow-sm">
          <div className="border-b border-indigo-100 bg-indigo-600 px-5 py-3">
            <h2 className="text-lg font-semibold text-white">Quick Info</h2>
          </div>
          <div className="space-y-2 px-5 py-4 text-sm text-slate-700">
            <p><span className="mr-2 text-indigo-600">✓</span>All fields marked with * are required</p>
            <p><span className="mr-2 text-sky-600">✓</span>Your information is encrypted and secure</p>
            <p><span className="mr-2 text-cyan-600">✓</span>You can update your details anytime after registration</p>
            <p><span className="mr-2 text-indigo-600">✓</span>Select a preferred doctor to see their availability</p>
            <p><span className="mr-2 text-sky-600">✓</span>Describe your current health condition in detail</p>
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {/* Patient Registration Form */}
        <div>
          <Section title={t('patientRegistrationForm')}>
            <form onSubmit={handleSubmit} className="space-y-6 registration-form-large">
              {/* Personal Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">{t('personalInformation')}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('firstName')}</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('lastName')}</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('dateOfBirth')}</label>
                    <input
                      type="date"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('gender')}</label>
                    <select
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    >
                      <option value="">{t('selectGender')}</option>
                      <option value="Male">{t('male')}</option>
                      <option value="Female">{t('female')}</option>
                      <option value="Other">{t('other')}</option>
                      <option value="Prefer not to say">{t('preferNotToSay')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('bloodType')}</label>
                    <select
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      value={formData.bloodType}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                    >
                      <option value="">{t('selectBloodType')}</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('preferredLanguage')}</label>
                    <select
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      value={formData.preferredLanguage}
                      onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                    >
                      <option value="">{t('selectLanguage')}</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Mandarin Chinese">Mandarin Chinese</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Russian">Russian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">{t('contactInformation')}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      placeholder={t('phonePlaceholder')}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('emailAddress')}</label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      placeholder={t('emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('password')}</label>
                    <input
                      type="password"
                      required
                      minLength="8"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('confirmPassword')}</label>
                    <input
                      type="password"
                      required
                      minLength="8"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">{t('medicalInformation')}</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('diseaseQuestion')}</label>
                  <textarea
                    rows="4"
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    placeholder={t('diseasePlaceholder')}
                    value={formData.currentDisease}
                    onChange={(e) => handleInputChange('currentDisease', e.target.value)}
                  />
                  
                  {/* Doctor Suggestions Based on Disease */}
                  {suggestedDoctors.length > 0 && (
                    <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                      <p className="text-sm font-semibold text-blue-900 mb-2">
                        💡 Suggested Doctors for Your Condition:
                      </p>
                      <div className="space-y-2">
                        {suggestedDoctors.map((suggestion, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-blue-300 bg-white p-3 cursor-pointer hover:bg-blue-50 transition"
                            onClick={() => {
                              setFormData({ ...formData, preferredDoctor: suggestion.doctorName });
                              setSelectedDoctorSchedule(suggestion.info);
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-slate-800 text-sm">{suggestion.doctorName}</p>
                                <p className="text-xs text-blue-600 font-medium">{suggestion.info.specialty}</p>
                                <p className="text-xs text-slate-600">{suggestion.info.specialization}</p>
                                {suggestion.matchingConditions.length > 0 && (
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {suggestion.matchingConditions.map((condition, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded"
                                      >
                                        ✓ {condition}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                className="ml-2 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData({ ...formData, preferredDoctor: suggestion.doctorName });
                                  setSelectedDoctorSchedule(suggestion.info);
                                }}
                              >
                                Select
                              </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              Next available: {suggestion.info.nextAvailable}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preferred Doctor */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">{t('doctorPreference')}</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('preferredDoctor')}</label>
                  <select
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={formData.preferredDoctor}
                    onChange={(e) => {
                      handleInputChange('preferredDoctor', e.target.value);
                      setSelectedDoctorSchedule(e.target.value ? doctorAvailability[e.target.value] : null);
                    }}
                  >
                    <option value="">{t('selectDoctor')}</option>
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                  {selectedDoctorSchedule && (
                    <div className="mt-2 rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm">
                      <p className="font-semibold text-blue-900">{selectedDoctorSchedule.specialty}</p>
                      <p className="text-xs text-blue-700 mb-2">{selectedDoctorSchedule.specialization}</p>
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-blue-800 mb-1">Treats:</p>
                        <p className="text-xs text-blue-600">{selectedDoctorSchedule.treatsConditions.join(', ')}</p>
                      </div>
                      <p className="text-blue-800 font-medium">⏰ Next Available: {selectedDoctorSchedule.nextAvailable}</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700"
              >
                {t('completeRegistration')}
              </button>
            </form>
          </Section>
        </div>
      </div>

      <Section title="Available Doctors & Specialists">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(doctorAvailability).map(([doctorName, info]) => (
            <div
              key={doctorName}
              className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-800">{doctorName}</h4>
                <span className="text-xs font-medium text-yellow-600">⭐ {info.rating}</span>
              </div>
              <p className="text-sm font-semibold text-blue-600 mb-1">{info.specialty}</p>
              <p className="text-xs text-slate-600 mb-2">{info.specialization}</p>
              <p className="text-xs text-slate-500 mb-2">Experience: {info.experience}</p>
              
              <div className="mb-2">
                <p className="text-xs font-semibold text-slate-700 mb-1">Treats:</p>
                <div className="flex flex-wrap gap-1">
                  {info.treatsConditions.map((condition, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-green-50 text-xs text-green-700 px-2 py-0.5 rounded"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-2 pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700 mb-1">Availability:</p>
                {info.availability.map((slot, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-slate-100 text-xs text-slate-700 px-2 py-1 rounded mr-1 mb-1"
                  >
                    {slot}
                  </span>
                ))}
              </div>
              
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-medium text-green-600">
                  ⏰ Next Available: {info.nextAvailable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default PatientRegistrationPage;
