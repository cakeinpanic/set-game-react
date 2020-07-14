import Modal from 'react-awesome-modal'
import React from 'react'
import './RulesPopup.scss'
export const RulesPopup = ({ isModalVisible, setIsModalVisible }: any) => {
  return (<Modal visible={isModalVisible}
                 width="400" height="300" effect="fadeInDown"
                 onClickAway={() => setIsModalVisible(false)}>
    <div className="popup">
      <h1>How to play</h1>
      <p>This is an online version of SET game</p>
      <p>You can find official rules <a href="https://www.ultraboardgames.com/set/game-rules.php" target="_blank" rel="noopener noreferrer"> here</a></p>
      <a className="close" onClick={() => setIsModalVisible(false)}>X</a>
    </div>
  </Modal>)
}