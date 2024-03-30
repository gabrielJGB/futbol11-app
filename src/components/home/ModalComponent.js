import React from 'react'
import Modal from 'react-native-modal'
import { View, Text, StyleSheet } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { Button } from 'react-native-paper'
import { is_same_day } from '../../utils/time'

const ModalComponent = ({ modalVisible, setModalVisible, selectedDate, setSelectedDate, setLoading }) => {

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',]
  const weekDays = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']
  const { theme, isDarkMode } = useTheme()


  const closeModal = () => {
    setModalVisible(false)
  }

  const ButtonComponent = ({ title }) => {
    return (
      <View>
        <Text style={tw`text-[30px] text-[${theme.colors.text}]`} >{title}</Text>
      </View>
    )
  }

  return (


    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.7}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      onSwipeComplete={closeModal}
      swipeDirection={['down']}
      style={styles.modal}
      onBackdropPress={closeModal}
    >


      {/* 

    backgroundColor: 'blue',
    color: 'black',
    height: '65%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
*/}
      <View style={tw`bg-[${theme.colors.card}] h-[65%] rounded-t-lg py-4`}>

        <Text style={tw`text-[${theme.colors.text}] mx-auto text-2xl font-semibold`}>Seleccionar fecha</Text>

        <CalendarPicker
          onDateChange={(date) => {
            setSelectedDate(date)
            setLoading(true)
            setModalVisible(false)
          }}


          textStyle={tw`text-[${theme.colors.text}]`}
          customDatesStyles={tw`text-[${theme.colors.text}]`}
          nextComponent={<ButtonComponent title=">" />}
          previousComponent={<ButtonComponent title="<" />}

          months={months}
          weekdays={weekDays}
          selectedDayColor='aqua'
          selectedStartDate={selectedDate}
          initialDate={selectedDate}
          showDayStragglers
        />

        {
          !is_same_day(selectedDate, new Date()) &&
          <View style={tw`w-[30%] m-4`}>
            <Button
              textColor='white'
              buttonColor='black'
              dark={isDarkMode}
              onPress={() => {
                setSelectedDate(new Date())
                setLoading(true)
                closeModal()
              }}
            >
              Volver a hoy
            </Button>
          </View>
        }

      </View>

    </Modal>


  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginVertical: 0,

  }
});

export default ModalComponent