import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 4,
  },
});

const RecipePDF = ({ recipe }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{recipe.name}</Text>
        <View style={styles.section}>
          <Text style={styles.heading}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
              {ingredient}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} style={styles.text}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default RecipePDF;
