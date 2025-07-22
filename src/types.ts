/**
 * @fileoverview This file defines the TypeScript interfaces (types) used across the application.
 * These interfaces help enforce type safety and provide clear documentation for the shape of data objects.
 */

/**
 * Interface representing a single quote object specifically for Rom-Com movies/TV shows.
 * This shape directly corresponds to an individual item in your `quotes.json` file.
 *
 * @property {string} quote - The main text of the quote itself. This is a mandatory property.
 * @property {string} movie - The title of the movie or TV show from which the quote originates.
 * This is the correct answer for the quiz question.
 */

export interface Quote {
  quote: string;
  movie: string;
}

/**
 * Interface describing the entire structure of the `quotes.json` file.
 * It's expected that the JSON file contains a single root object
 * with a property named 'quotes' which is an array of 'Quote' objects.
 *
 * This interface is crucial for correctly typing the imported JSON data
 * and ensuring TypeScript understands its structure.
 *
 * @property {Quote[]} quotes - An array containing multiple 'Quote' objects.
 * Each element in this array adheres to the 'Quote' interface.
 */

export interface QuotesJsonData {
  quotes: Quote[];
}