class EventBus {
  constructor() {
    this.events = this.events || []
  }
}
EventBus.prototype.emit = function (type, ...args) {
  let e
  e = this.events[type]
  if (Array.isArray(e)) {
    for (let i = 0; i < e.length; i++) {
      e[i].apply(this, args)
    }
  } else if (e && e[0]) {
    e[0].apply(this, args)
  }
}
//if fun need this, bind(this) before addListener
//如果需要指回this，需要在传入fun前，通过bind绑定this
EventBus.prototype.addListener = function (type, fun) {
  const e = this.events[type]
  if (!e) {
    this.events[type] = [fun]
  } else {
    e.push(fun)
  }
}
// can't be anonymous function
// 不能使用匿名函数，否则无法关闭监听
EventBus.prototype.removeListener = function (type, fun) {
  const e = this.events[type]
  if (e) {
    for (let i = 0; i < e.length; i++) {
      if (e[i] === fun) {
        e.splice(i, 1)
        break
      }
    }
  }
}
const eventBus = new EventBus()
export default eventBus
