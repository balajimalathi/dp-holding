/**
 * Encodes an object to URL-safe Base64 string
 * @param data - The object to encode
 * @returns URL-safe Base64 encoded string
 * 
 * Process:
 * 1. Convert object to JSON string
 * 2. Convert JSON to query parameter string
 * 3. Encode query string to Base64
 * 4. Make Base64 URL-safe by replacing special characters
 */
export function encode(data: object): string {
  // Convert object to query parameter string first
  const jsonStr = jsonToQueryParams(JSON.stringify(data));
  
  // Convert to Base64 and make URL-safe
  return Buffer.from(jsonStr).toString('base64')
    .replace(/\+/g, '-')  // Replace + with -
    .replace(/\//g, '_')  // Replace / with _
    .replace(/=+$/, '');  // Remove padding =
}

/**
 * Decodes URL-safe Base64 string back to object
 * @param encoded - The URL-safe Base64 string to decode
 * @returns Parsed object from the decoded string
 * 
 * Process:
 * 1. Convert URL-safe Base64 to standard Base64
 * 2. Add padding if needed
 * 3. Decode Base64 to original query string
 * 4. Convert query string back to JSON object
 */
export function decode(encoded: string): any {
  // Convert from URL-safe to standard Base64
  let base64 = encoded
    .replace(/-/g, '+')  // Replace - with +
    .replace(/_/g, '/'); // Replace _ with /

  // Add padding if needed (Base64 requires length divisible by 4)
  while (base64.length % 4) {
    base64 += '=';
  }

  // Decode Base64 to original query string
  const jsonStr = Buffer.from(base64, 'base64').toString('utf8');
   
  // Convert query string back to JSON object
  return queryParamsToJson(jsonStr);
}

/**
 * Converts JSON string to query parameter string
 * @param jsonStr - JSON string to convert
 * @returns URL query parameter string (key=value&key2=value2)
 */
function jsonToQueryParams(jsonStr: string): string {
  try {
    const obj = JSON.parse(jsonStr);
    const params = new URLSearchParams();

    // Convert each object property to query parameter
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    return params.toString();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return '';
  }
}

/**
 * Converts query parameter string back to JSON string
 * @param queryString - The query string to convert (key=value&key2=value2)
 * @returns JSON string representation of the query parameters
 */
function queryParamsToJson(queryString: string) {
  try {
    const params = new URLSearchParams(queryString);
    const result: Record<string, any> = {};

    // Process each key-value pair in the query string
    params.forEach((value, key) => {
      if (result.hasOwnProperty(key)) {
        // Handle duplicate keys by converting to array
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    });

    // Convert string values to proper types (boolean, number, etc.)
    Object.keys(result).forEach(key => {
      const value = result[key];
      
      if (Array.isArray(value)) {
        // Process each array element
        result[key] = value.map(v => convertStringValue(v));
      } else {
        result[key] = convertStringValue(value);
      }
    });

    return result;
  } catch (error) {
    console.error('Error parsing query string:', error);
    return '{}'; // Return empty object on error
  }
}

/**
 * Helper function to convert string values to proper JavaScript types
 * @param value - The string value to convert
 * @returns Converted value (boolean, number, null, or original string)
 */
function convertStringValue(value: string): any {
  // Handle boolean values
  if (value === 'true') return true;
  if (value === 'false') return false;
  
  // Handle null/undefined
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  
  // Convert integer strings to numbers
  // if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  
  // Convert float strings to numbers
  // if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
  
  // Return original string if no conversion applies
  return value;
}