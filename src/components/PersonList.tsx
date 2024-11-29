import { useEffect, useState } from "react";
import { PersonDto } from "../dtos/person.dto";
import { api } from "../services/axios";

const PersonList = () => {
  const [persons, setPersons] = useState<PersonDto[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const handleCheckboxChange = (value: number) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const deletePersons = async (ids: number[]) => {
    if (ids.length) {
      await api.post("/delete-person", { ids });
      initializeData();
    }
  };
  const bulkDelete = async () => {
    setLoading(true);
    await deletePersons(selectedValues);
    setSelectedValues([]);
    setLoading(false);
  };
  const initializeData = async () => {
    setLoading(true);
    console.log("setSearchText...", searchText);
    await getCount(searchText);
    await getPersons(skip, searchText);
  };

  const getPreviousPage = async () => {
    if (skip > 0) {
      setSkip((previous) => previous - limit);
      await getPersons(skip - limit, searchText);
    }
  };

  const getNextPage = async () => {
    if (skip + limit < count) {
      setSkip((previous) => previous + limit);
      await getPersons(skip + limit, searchText);
    }
  };

  const getPersons = async (newSkip: number, q: string) => {
    setLoading(true);
    await api
      .post("/person-list", { skip: newSkip, limit, q })
      .then((response) => {
        setPersons(response.data);
      });
    setLoading(false);
  };

  const getCount = async (searchText: string) => {
    await api.post("/person-count", { q: searchText }).then((response) => {
      setCount(response.data);
    });
  };

  return (
    <div className="flex flex-col mx-auto w-full md:w-1/2 pt-4">
      {selectedValues.length > 0 && (
        <div className="flex justify-end mb-3">
          <button
            className="bg-red-500 text-white py-2 px-3 rounded"
            onClick={bulkDelete}
          >
            Delete ({selectedValues.length})
          </button>
        </div>
      )}
      <input
        className="w-full  mb-2 py-2 px-3 bg-slate-100"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            initializeData();
          }
        }}
        placeholder="Search Person"
      />
      {loading ? (
        <p className="text-center font-semibold py-7">Loading...</p>
      ) : count > 0 ? (
        persons.map((person) => (
          <div
            key={person.id}
            className="person-list my-1 p-4 border rounded shadow-lg flex flex-col"
          >
            <div className="flex flex-wrap gap-3">
              <input
                type="checkbox"
                value={person.id}
                checked={selectedValues.includes(person.id)}
                onChange={() => handleCheckboxChange(person.id)}
                className="form-checkbox text-blue-600"
              />
              <p>
                <strong>Name:</strong> {person.firstName} {person.middleName}{" "}
                {person.lastName}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {new Date(person.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Gender:</strong> {person.gender}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {person.emails.length > 0 && (
                <div className="rounded bg-slate-100 px-2 py-2">
                  <h2 className="font-semibold">Emails</h2>
                  <ul className="list-disc list-inside flex flex-col">
                    {person.emails.map((email) => (
                      <li key={email.id} className="flex items-center">
                        {email.emailType} - {email.email}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {person.mobiles.length > 0 && (
                <div className="rounded bg-slate-100 px-2 py-2">
                  <h2 className="font-semibold">Mobiles</h2>
                  <ul className="list-disc list-inside flex flex-col">
                    {person.mobiles.map((mobile) => (
                      <li key={mobile.id} className="flex items-center">
                        {mobile.mobileType} - {mobile.mobile}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {person.addresses.length > 0 && (
              <h2 className="font-semibold mt-2">Addresses</h2>
            )}
            {person.addresses.map((address) => (
              <p key={address.id}>
                <strong>{address.addressType}</strong> -{address.address},{" "}
                {address.city}, {address.state}, {address.country} -{" "}
                {address.pincode}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center font-semibold py-7">No Records Found</p>
      )}

      {count > 0 && (
        <div className="flex items-center justify-end mb-3 mt-2">
          {!loading && (
            <div className="mr-2">
              {skip + 1}-{Math.min(skip + limit, count)}/{count}
            </div>
          )}
          <div className="flex">
            {skip > 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getPreviousPage}
              >
                {"<"} previous
              </button>
            )}
            {skip + limit < count && (
              <button
                className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getNextPage}
              >
                next {">"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonList;
