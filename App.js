import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, Button, Modal, Text  } from 'react-native';
import TaskItem from './taskItem';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const addTask = () => {
    if (inputText === '') return;
    setTasks([...tasks, { id: Date.now(), text: inputText }]);
    setInputText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (id) => {
    const task = tasks.find(t => t.id === id);
    setTaskToEdit(task);
    setInputText(task.text);
  };
  
  const saveTask = () => {
    const updatedTasks = tasks.map(t => {
      if (t.id === taskToEdit.id) {
        return { ...t, text: inputText };
      }
      return t;
    });
    setTasks(updatedTasks);
    setTaskToEdit(null);
    setInputText('');
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };  
  
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={taskToEdit ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
      />
      {!taskToEdit ? (
        <Button title="Ajouter une tâche" onPress={addTask} />
      ) : (
        <Button title="Sauvegarder les changements" onPress={saveTask} />
      )}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onDelete={deleteTask} 
            onEdit={startEditing} 
            onPress={() => handleTaskPress(item)} // Ajoutez cette ligne pour gérer le clic sur la tâche
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedTask?.text}</Text>
            <Button
              title="Fermer"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  input: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default App;