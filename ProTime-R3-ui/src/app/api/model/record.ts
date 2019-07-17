/**
 * ProTimeR3
 * Project Time Recording Tool by Dominik Mathmann
 *
 * The version of the OpenAPI document: 3.2
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface Record { 
    id?: number;
    start?: Date;
    end?: Date;
    project?: number;
    description?: string;
    journeyTime?: boolean;
    duration?: number;
}
