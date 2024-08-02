const translations = {
            'en': {
                'title': 'Extension Settings',
                'tokenLabel': 'Enter OpenVK token:',
                'placeholder': 'Enter something...',
                'save': 'Save',
                'languageLabel': 'Select language:',
                'alertMessage': 'Settings saved!'
            },
            'ru': {
                'title': 'Настройки расширения',
                'tokenLabel': 'Введите токен OpenVK:',
                'placeholder': 'Введите что-нибудь...',
                'save': 'Сохранить',
                'languageLabel': 'Выберите язык:',
                'alertMessage': 'Настройки сохранены!'
            },
            'uk': {
                'tokenLabel': 'Введіть токен OpenVK:',
                'placeholder': 'Введіть щось...',
                'save': 'Зберегти',
                'alertMessage': 'Налаштування збережено!'
            }
};

function setLanguage(lang) {
    document.getElementById('tokenLabel').textContent = translations[lang]['tokenLabel'];
    document.getElementById('tokenInput').placeholder = translations[lang]['placeholder'];
    document.getElementById('save').textContent = translations[lang]['save'];
	alertmsg = translations[lang]['alertMessage'];
}

document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    browser.storage.local.get(['extLang', 'extToken']).then((result) => {
        document.getElementById('extLang').value = result.extLang || 'en';
        document.getElementById('tokenInput').value = result.extToken || '';
		const extLang = document.getElementById('extLang').value;
		setLanguage(extLang);
    });

    // Save settings when the save button is clicked
    document.getElementById('save').addEventListener('click', () => {
        const extLang = document.getElementById('extLang').value;
        const extToken = document.getElementById('tokenInput').value;
        setLanguage(extLang);
        alert(alertmsg);
        browser.storage.local.set({ extLang, extToken });
    });
});
