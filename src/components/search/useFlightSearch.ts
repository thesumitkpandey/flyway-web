"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { airportOrFirst, type Airport } from "@/data/airports";
import { isoAfter } from "@/lib/date";
import type { CabinClass, FareType, TravellerGroup, TripType } from "./types";

type UseFlightSearchOptions = {
  initialDepart: string;
  initialReturn: string;
};

export function useFlightSearch({
  initialDepart,
  initialReturn,
}: UseFlightSearchOptions) {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("round");
  const [origin, setOrigin] = useState<Airport>(() => airportOrFirst("DEL"));
  const [destination, setDestination] = useState<Airport>(() =>
    airportOrFirst("DXB"),
  );
  const [depart, setDepart] = useState(initialDepart);
  const [returnDate, setReturnDate] = useState(initialReturn);
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState<CabinClass>("economy");
  const [fareType, setFareType] = useState<FareType>("regular");
  const [error, setError] = useState("");

  function changeTripType(value: TripType) {
    setTripType(value);
    if (value === "round" && !returnDate) {
      setReturnDate(isoAfter(depart, 3));
    }
    setError("");
  }

  function swapAirports() {
    setOrigin(destination);
    setDestination(origin);
    setError("");
  }

  function changeDepart(value: string) {
    setDepart(value);
    if (returnDate && returnDate < value) {
      setReturnDate(isoAfter(value, 1));
    }
    setError("");
  }

  function changeReturn(value: string) {
    setReturnDate(value);
    setTripType("round");
    setError("");
  }

  function enableReturn() {
    setTripType("round");
    setReturnDate((current) => current || isoAfter(depart, 3));
  }

  function changeTravellers(group: TravellerGroup, count: number) {
    setTravellers((current) => ({ ...current, [group]: count }));
    setError("");
  }

  function validate(): string {
    if (origin.code === destination.code) {
      return "Origin and destination cannot be the same city.";
    }
    if (!depart) {
      return "Choose a departure date.";
    }
    if (tripType === "round" && !returnDate) {
      return "Choose a return date, or switch to one way.";
    }
    if (travellers.infants > travellers.adults) {
      return "Each infant needs an accompanying adult.";
    }
    return "";
  }

  function submit() {
    const message = validate();
    setError(message);
    if (message) {
      return;
    }

    const params = new URLSearchParams({
      from: origin.code,
      to: destination.code,
      depart,
      trip: tripType,
      adults: String(travellers.adults),
      children: String(travellers.children),
      infants: String(travellers.infants),
      cabin,
      fare: fareType,
    });

    if (tripType === "round") {
      params.set("return", returnDate);
    }

    router.push(`/flights?${params.toString()}`);
  }

  return {
    tripType,
    origin,
    destination,
    depart,
    returnDate,
    travellers,
    cabin,
    fareType,
    error,
    changeTripType,
    setOrigin,
    setDestination,
    setCabin,
    setFareType,
    swapAirports,
    changeDepart,
    changeReturn,
    enableReturn,
    changeTravellers,
    submit,
  };
}
