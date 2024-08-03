// делаем новый классный скриптик
var style = document.createElement('style');
style.type = 'text/css';

// грузим токен
browser.storage.local.get(['extLang', 'extToken']).then((result) => {
	ovkToken = result.extToken || '';
	extLang = result.extLang || 'en';
	errmsg = translations[extLang]['err'];
});


// языки
const translations = {
            'en': {
                'err': 'Error! Please, check your OpenVK token in extension settings. (More info in console)'
            },
            'ru': {
                'err': 'Ошибка! Пожалуйста, проверьте ваш токен OpenVK в параметрах расширения. (Больше информации в консоли)'
            },
            'uk': {
                'err': 'Помилка! Будь ласка, перевірте ваш токен OpenVK у параметрах розширення. (Більше інформації в консолі)'
            }
};

// стиль кнопки загрузки
var styles = `
  .audioEntry .buttons .download-icon {
    width: 16px;
    height: 16px;
    float: left;
    background-position: -16px -47px;
    margin-top: 1px;
    transition: margin-right 0.1s ease-out, opacity 0.1s ease-out;
    transform: rotate(90deg);
  }
`;

// Добавляем стиль в элемент style
if (style.styleSheet) {
  style.styleSheet.cssText = styles;
} else {
  style.appendChild(document.createTextNode(styles));
}

function downloadFile(url) {
  // Создаем новый объект URL
  const link = document.createElement('a');
  link.href = url;

  // Извлекаем имя файла из URL-адреса
  const pathParts = link.pathname.split('/');
  const filename = pathParts[pathParts.length - 1];

  // Устанавливаем имя файла для скачивания
  link.download = filename;

  // Добавляем элемент <a> в DOM и нажимаем на него программно
  document.body.appendChild(link);
  link.click();

  // Удаляем элемент <a> из DOM
  document.body.removeChild(link);
}

function patchpage() {
	// получаем все элементы с классом miniplayer
	var miniplayers = document.getElementsByClassName('volume');

	// перебираем каждый miniplayer на странице
	for (var i = 0; i < miniplayers.length; i++) {
	  // miniplayer чтоб его
	  var buttons = miniplayers[i].getElementsByClassName('buttons');
	  
	  // вроде чёта важное делает, я забыл уже
	  for (var j = 0; j < buttons.length; j++) {
		dlbtn = document.createElement('div');
		dlbtn.className = 'download-icon musicIcon';
		dlbtn.id = i;
		dlbtn.title = 'Скачать';
		dlbtn.appendChild(style);
		dlbtn.addEventListener('click', function() {
		// грузим токен
		browser.storage.local.get(['extLang', 'extToken']).then((result) => {
			ovkToken = result.extToken || '';
			extLang = result.extLang || 'en';
			errmsg = translations[extLang]['err'];
		});
		var kakashka = this.parentElement;
		kakashka = kakashka.parentElement;
		kakashka = kakashka.parentElement;
		kakashka = kakashka.parentElement;
		kakashka = kakashka.parentElement;
		kakashka1 = kakashka.getAttribute('data-realid');
		kakashka2 = btoa(kakashka1);
		let trackUrl = 'https://ovk.to//method/Audio.getbyid?access_token='+ovkToken+'&audios=' + kakashka2;

		// Выполняем GET запрос
		fetch(trackUrl)
		  .then(response => {
			// Обработка ответа как JSON
			if (response.ok) {
			  return response.json();
			} else {
			  alert(errmsg)
			  throw new Error('ккшк какаета: ' + response.status);
			}
		  })
		  .then(data => {
			// Обработка данных в формате JSON
			// Предполагается, что data имеет структуру response -> items -> [0] -> url
			if (data.response && data.response.items && data.response.items.length > 0) {
			  let itemUrl = data.response.items[0].url;
			 downloadFile(itemUrl);
			} else {
			  alert(errmsg)
			  console.error('чёта эээ ккшк какаета');
			}
		  })
		  .catch(error => {
			// Обработка ошибок
			alert(errmsg)
			console.error('ккшк какаета:', error);
		  });
		});
		buttons[j].appendChild(dlbtn);
	  }
	}
};
let lastUrl = window.location.href;

// Функция для обработки изменений URL
function handleUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        patchpage();
    }
}

// Проверяем URL каждую секунду
setInterval(handleUrlChange, 1000);

patchpage();