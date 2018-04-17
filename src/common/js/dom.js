export function addClass(el, className) {
  if (!hasClass(el, className)) {
    let newClass = el.className.split()
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 获取DOM属性
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    el.setAttribute(prefix + name, val)
  } else {
    el.getAttribute(prefix + name)
  }
}
