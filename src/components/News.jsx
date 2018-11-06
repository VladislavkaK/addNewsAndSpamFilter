import React from "react"; // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from "prop-types"; // у Article это react и prop-types
import { Article } from "./Article";

class News extends React.Component {
//   state = {
//     // создали состояние
//     filteredNews: this.props.data
//   };

//   componentWillReceiveProps(nextProps) {
//     let nextFilteredNews = [...nextProps.data]
  
//     nextFilteredNews.forEach((item, index) => {
//       if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
//         item.bigText = 'СПАМ'
//       }
//     })
  
//     this.setState({ filteredNews: nextFilteredNews })
//   }

// static getDerivedStateFromProps(props, state) {
//     let nextFilteredNews = [...props.data] // было nextProps - переименовали
  
//     nextFilteredNews.forEach((item, index) => {
//       if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
//         item.bigText = 'СПАМ'
//       }
//     })
  
//     return { // возвращаем новое состояние
//       filteredNews: nextFilteredNews,
//     }
//   }

renderNews = () => {
    const { data } = this.props
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function(item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return newsTemplate
  }
  render() {
    const { data } = this.props

    return (
      <div className="news">
        {this.renderNews()}
        {data.length ? (
          <strong className={'news__count'}>
            Всего новостей: {data.length}
          </strong>
        ) : null}
      </div>
    )
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired
};

export { News };
