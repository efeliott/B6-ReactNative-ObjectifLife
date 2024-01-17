import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onDelete, onEdit, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {task.text}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onDelete(task.id)}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(task.id)}>
          <Text style={styles.editText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  textContainer: {
    flex: 1, // Ajoutez ceci
    marginRight: 10, // Ajoutez un peu d'espace entre le texte et les boutons
  },
  text: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e7e7e7',
  },
  deleteText: {
    color: 'red',
  },
  editText: {
    color: 'blue',
  }
});

export default TaskItem;
