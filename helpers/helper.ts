export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const utcDate = date.toUTCString();
  return utcDate;
}
/**
 * The metric name is surrounded by the string tomato, so we need to remove it.
 * @param metricName
 */
export function extractMetricName(metricName: string) {
  let regexMetricTypeExternalMetric = /(?<=tomato)(.*?)(?=tomato)/;
  let metricNameWithoutTomato = metricName.match(regexMetricTypeExternalMetric);
  return metricNameWithoutTomato ? metricNameWithoutTomato[0] : metricName;
}

export function extractReason(message: string, metricType: string) {
  const regex = /(?<=reason: ).*/;
  const match = message.match(regex);
  let reason = match ? match[0].toLowerCase() : "Unknown";
  if (reason !== "all metrics below target") {
    reason = "external metric " + metricType + " above target";
  }
  return reason;
}

interface requestProps {
  path: string;
  sortingOperator?: string;
  paginationOperator?: string;
  filterOperator?: string;
}
export async function requestBackend({
  path,
  sortingOperator,
  paginationOperator,
  filterOperator,
}: requestProps) {
  const apiEventsUrl = process.env.API_URL?.toString() + path;
  let requestUrl = apiEventsUrl + "?";
  if (sortingOperator != null) {
    requestUrl += "sort=" + sortingOperator + "&";
  }
  if (paginationOperator != null) {
    requestUrl += "pagination=" + paginationOperator + "&hasPagination=true&";
  }
  if (filterOperator != null) {
    requestUrl += "filters=" + filterOperator + "&";
  }
  if (
    sortingOperator == null &&
    paginationOperator == null &&
    filterOperator == null
  ) {
    requestUrl = apiEventsUrl;
  }

  const res = await fetch(requestUrl);
  const data = await res.json();
  return data;
}

// remove the last character of a string if its the character m
export function parseIfLastCharacterIsM(metricValue: number) {
  let metricValueString = metricValue.toString();
  if (metricValueString.endsWith("m")) {
    metricValueString = metricValueString.slice(0, -1);
    metricValue = parseFloat(metricValueString);
    metricValue = metricValue / 100;
  }
  return metricValue;
}
