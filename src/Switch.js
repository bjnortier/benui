import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ValueComponent from './ValueComponent'
import Decorator from './Decorator'
import Spinner from './Spinner'

const Outer = styled.div`
  display: inline-block;
  width: 48px;
  height: 30px;
  border: solid 1px ${({ disabled, inProgress, value }) => (value && !disabled) ? '#2e70b5' : '#ccc'};
  border-radius: 16px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: ${({ disabled, inProgress }) => (disabled || inProgress) ? 'not-allowed' : 'pointer'};
  background-color: ${({ disabled, inProgress, value }) => disabled ? 'transparent' : value ? '#3b99fc' : '#fff'}
  :focus {
    outline: none;
  }
`
const Knob = styled.div`
  display: inline-block;
  position: absolute;
  left: ${props => props.value ? 19 : -1}px;
  top: -1px;
  width: 30px;
  height: 30px;
  border: solid 1px ${({ disabled, inProgress }) => (disabled || inProgress) ? '#999' : '#444'};
  border-radius: 16px;
  background-color: ${({ disabled, inProgress }) => (disabled || inProgress) ? '#e6e6e6' : '#fff'};
`

const SpinnerPad = styled.div`
  padding-left: 7px;
  padding-top: 6px;
  color: #999;
`

class Switch extends ValueComponent {
  handleChange (event) {
    super.handleChange(event, !this.state.value)
  }

  /**
   * Prevent the default window scrolling behaviour when Switch has focus
   */
  handleKeyDown (event) {
    if (event.keyCode === 32) {
      event.preventDefault()
    }
  }

  handleKeyUp (event) {
    if (event.keyCode === 32) {
      this.handleChange(event)
    }
  }

  render () {
    const { disabled, error, inProgress } = this.props
    const { value } = this.state
    return <Decorator error={error}>
      <Outer
        tabIndex={disabled || inProgress ? null : 0}
        disabled={disabled}
        value={value}
        inProgress={inProgress}
        onClick={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
      >
        <Knob value={value} disabled={disabled} inProgress={inProgress}>
          {inProgress ? <SpinnerPad><Spinner /></SpinnerPad> : null}
        </Knob>
      </Outer>
    </Decorator>
  }
}

Switch.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  inProgress: PropTypes.bool
}

Switch.defaultProps = {
  value: false,
  disabled: false,
  error: false,
  inProgress: false
}

export default Switch
