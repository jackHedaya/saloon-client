/**
 * Modified from github:charlax/react-persist#patch-1
 */

import React from 'react'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'

export default class Persist extends React.Component {
  static defaultProps = {
    debounce: 300,
  }

  persist = debounce(data => {
    window.localStorage.setItem(this.props.name, JSON.stringify(data))
  }, this.props.debounce)

  componentDidUpdate({ data }) {
    if (!isEqual(data, this.props.data)) {
      this.persist(this.props.data)
    }
  }

  componentDidMount() {
    const data = window.localStorage.getItem(this.props.name)
    if (data && data !== null) {
      this.props.onMount(JSON.parse(data))
    }

    if (this.props.onComplete) this.props.onComplete()
  }

  render() {
    return null
  }
}
