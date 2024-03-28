import { View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import tw from 'twrnc'

const ModalComponent = ({ modalVisible, setModalVisible }) => {

    const closeModal = () => {
        setModalVisible(false)
    }

    return (


        <Modal
            isVisible={modalVisible}
            backdropOpacity={0}
            animationOutTiming={500}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onSwipeComplete={closeModal}
            swipeDirection={['down']}
            style={styles.modal}
            onBackdropPress={closeModal}>
            <View style={styles.modalContent}>
                    <Text style={tw`text-white`}>Content</Text>
            </View>
        </Modal>


    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    button: {
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
      margin: 10,
    },
    modal: {
      justifyContent: 'flex-end',
      marginHorizontal:5,
      marginVertical: 0,
    },
    modalContent: {
      backgroundColor: 'white',
      color: 'black',
      height: '65%',
  
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
  });

export default ModalComponent