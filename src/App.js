import React from 'react'
// импорт пакета prop-types удален, так как в этом файле prop-types не используется
import { Add } from './components/Add' // ./ = текущая директория,
import { News } from './components/News' // далее мы идем в директорию components и в нужный компонент
import './App.css'
// далее скопировано из тэга script

class App extends React.Component {
  state = {
    news: null, // было newsData
    isLoading: false
  };

  static getDerivedStateFromProps(props, state) {
    let nextFilteredNews

    // смотрим в state.news (ранее смотрели в props)
    // и проверяем, чтобы не клоинировать null
    // например, в момент первой отрисовки
    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news]

      nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
          item.bigText = 'СПАМ'
        }
      })

      return {
        filteredNews: nextFilteredNews,
      }
    }

    return null
  }

  handleAddNews = data => {
    const nextNews = [data, ...this.state.news];
    this.setState({ news: nextNews });
  };

  componentDidMount() {
    // ставим isLoading true, 
    // то есть запрос за даннмыи начался
    // фактически он начнется в строке с fetch,
    // но на переход от одной строки к другой
    // пройдут миллисекунды
    this.setState({ isLoading: true })
    // fetch('http://localhost:3000/data/newsData.json')
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     // запрос завершился успешно,
    //     // делаем isLoading: false
    //     // в news кладем пришедшие данные
    //     this.setState({ isLoading: false, news: data })
    //   })
    fetch('http://localhost:3000/data/newsData.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setTimeout(() => { // добавили задержку
        this.setState({ isLoading: false, news: data })
      }, 3000) // в три секунды
    })
  }

  render() {
    const { news, isLoading } = this.state;

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    );
  }
}

// скопировано все кроме ReactDOM.render

// добавился export
export default App;