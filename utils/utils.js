export const headers = [
    { title: 'Дата проведения матча', value: 'date', align: 'start', width: '150px' },
    { title: 'Время', value: 'time', align: 'start', width: '100px' },
    { title: 'Статус матча', value: 'status', align: 'start', width: '150px' },
    { title: 'Команды', value: 'teams', align: 'start', width: '300px' }, 
    { title: 'Счет', value: 'score', align: 'start', width: '100px' }
  ];

  export const formatDate = (utcDate) => {
    const date = new Date(utcDate)
    return date.toLocaleDateString()
  }
  
  export const formatTime = (utcDate) => {
    const date = new Date(utcDate)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
  }

  export const getStatus = (status) => {
    switch (status) {
      case 'FINISHED':
        return 'Закончен';
      case 'IN_PLAY':
        return 'В игре';
      case 'TIMED':
        return 'Запланирован';
      case 'POSTPONED':
        return 'Отложен';
      case 'CANCELED':
        return 'Отменен';
      case 'LIVE':
        return 'В прямом эфире';
      case 'PAUSED':
        return 'Пауза';
      case 'SUSPENDED':
        return 'Приостановлен';
      default:
        return status;
    }
  }

  export const getScore = (item) => {
    if (item.status === 'FINISHED') {
      const fullTimeScore = `(${item.score.fullTime.home} - ${item.score.fullTime.away})`;
      const halfTimeScore = item.score.halfTime ? `(${item.score.halfTime.home} - ${item.score.halfTime.away})` : '';
      const penaltiesScore = item.penalties ? `(${item.penalties.home} - ${item.penalties.away})` : '(-)';
      return `${fullTimeScore}${halfTimeScore}${penaltiesScore}`;
    } else {
      return 'Матч еще не состоялся';
    }
  }

