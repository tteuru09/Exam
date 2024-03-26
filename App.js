import { Divider } from "@rneui/themed";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [ajouterVisible, setAjouterVisible] = useState(false);
  const [modifierVisible, setModifierVisible] = useState(false);
  const [modifIndex, setModifIndex] = useState(0);
  const [actualTask, setActualTask] = useState("");
  const [index, setIndex] = useState(0);
  const [tasks, setTasks] = useState([]);

  const createTask = () => {
    setTasks([...tasks, { checked: false, title: actualTask, id: index }]);
    setIndex(index + 1);
    setActualTask("");
    setAjouterVisible(false);
  };
  const deleteTask = (index) => {
    setTasks(tasks.filter((task) => task.id !== index));
    setActualTask("");
    setModifIndex(0);
    setModifierVisible(false);
  };
  const changeChecked = (index) => {
    setTasks(
      tasks.map((task) =>
        task.id === index ? { ...task, checked: !task.checked } : task
      )
    );
  };
  const updateTask = (index) => {
    setTasks(
      tasks.map((task) =>
        task.id === index ? { ...task, title: actualTask } : task
      )
    );
    setActualTask("");
    setModifIndex(0);
    setModifierVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            margin: 10,
            fontWeight: "bold",
            color: "#001489",
            fontSize: 30,
          }}
        >
          TO DO List
        </Text>
        <View style={styles.container2}>
          {/* Modal pour modifier une tâche */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modifierVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModifierVisible(!modifierVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Modifiez la tâche</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setActualTask}
                  value={actualTask}
                />
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={[styles.button, { margin: 5 }]}
                    onPress={() => {
                      setModifierVisible(!modifierVisible);
                      setActualTask("");
                    }}
                  >
                    <Text style={styles.textStyle}>Annuler</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      { margin: 5, backgroundColor: "#ffc300" },
                    ]}
                    onPress={() =>
                      actualTask === "" ? null : updateTask(modifIndex)
                    }
                  >
                    <Text style={styles.textStyle}>Modifier</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      { margin: 5, backgroundColor: "#e5383b" },
                    ]}
                    onPress={() => deleteTask(modifIndex)}
                  >
                    <Text style={styles.textStyle}>Supprimer</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          {/* Modal pour ajouter une tâche */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={ajouterVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setAjouterVisible(!ajouterVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Nouvelle tâche</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setActualTask}
                  value={actualTask}
                />
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={[styles.button, { margin: 5 }]}
                    onPress={() => {
                      setAjouterVisible(!ajouterVisible);
                      setActualTask("");
                    }}
                  >
                    <Text style={styles.textStyle}>Annuler</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      { margin: 5, backgroundColor: "#89cff0" },
                    ]}
                    onPress={() => (actualTask === "" ? null : createTask())}
                  >
                    <Text style={styles.textStyle}>Ajouter</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={{
              borderRadius: 5,
              padding: 10,
              elevation: 2,
              margin: 10,
              backgroundColor: "#f5f5dc",
            }}
            onPress={() => setAjouterVisible(true)}
          >
            <Text style={{ fontSize: 20 }}>Ajouter une tâche</Text>
          </Pressable>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Liste des tâches à faire :
          </Text>
          {tasks.map((task) => {
            return task.checked == false ? (
              <Pressable
                key={task.id}
                onPress={() => {
                  setModifierVisible(true);
                  setModifIndex(task.id);
                  setActualTask(task.title);
                }}
                style={styles.boxTask}
              >
                <Checkbox
                  style={{ margin: 8 }}
                  value={task.checked}
                  onValueChange={() => changeChecked(task.id)}
                />
                <Text>{task.title}</Text>
              </Pressable>
            ) : null;
          })}
          <Divider style={{ width: "80%", margin: 20 }} color="#8a9cb8" />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Liste des tâches terminées :
          </Text>
          {tasks.map((task) => {
            return task.checked == true ? (
              <Pressable
                key={task.id}
                onPress={() => {
                  setModifierVisible(true);
                  setModifIndex(task.id);
                  setActualTask(task.title);
                }}
                style={styles.boxTask}
              >
                <Checkbox
                  style={{ margin: 8 }}
                  value={task.checked}
                  onValueChange={() => changeChecked(task.id)}
                />
                <Text>{task.title}</Text>
              </Pressable>
            ) : null;
          })}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#d3d3d3",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "white",
  },
  boxTask: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#ede3d9",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: "ghostwhite",
    borderColor: "black",
    borderWidth: 1,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
