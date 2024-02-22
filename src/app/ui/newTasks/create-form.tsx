'use client';

import { UserField } from "@/app/lib/definitions";
import { createTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function Form({ user }: { user : UserField[]}) {

    // const initialState = { message: "", errors: {} };

    // const [state, dispatch] = useFormState(createTask, initialState);

  return (
    <form action={createTask}>
      <div className="">
        <div className="">
          <label htmlFor="title" className="">
            Task Title:
          </label>
          <input 
            className=""
            id="title"
            type="text"
            name="title"
            placeholder="Enter a task title"
            aria-describedby="title-error" 
          />
        </div>

        <div className="">
          <label htmlFor="deadline" className="">
            Choose a deadline:
          </label>
          <input
            className=""
            id="deadline"
            type="date" 
          />
        </div>                  

        <div>
          <legend className="">
            Select the degree of priority:
          </legend>
          <div>
            <input
              id="low"
              name="priority"
              type="radio"
              value="low"
              className=""
            />
            <label htmlFor="low" className="">
              Low
            </label>
          </div>
          <div>
            <input
              id="medium"
              name="priority"
              type="radio"
              value="medium"
              className=""
            />
            <label htmlFor="medium" className="">
              Medium
            </label>
          </div>
          <div>
            <input
              id="urgent"
              name="priority"
              type="radio"
              value="urgent"
              className=""
            />
            <label htmlFor="urgent" className="">
              Urgent
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="share" className="">
            Share this task with:
          </label>
          {/* {user.map((user) =>
          (
              <option key={user.id} value={user.id}>
                  {user.name}
              </option>
          ))} */}
          
          <label htmlFor="group" className="">
            Or
          </label>
          <select className=""
            id="group"
            name="groupId"
            defaultValue=""
          >
            {/* <option value="" disabled>
            {user_group.map((user_group) => {
              <option key={user_group.id} value={user_group.id}>
                {user_group.name}
              </option>
            })}
            </option> */}
          </select>
        </div>
        <div>
          <label htmlFor="details" className="">
            Explain a little what you want to do:
          </label>
          <input className=""
            id="details"
            type="message"
            placeholder="Enter some explanation so that you remember"
          />
        </div>
    </div>

    <div className="">
        <Link
            href="/dashboard/"
            className=""
        >
            Cancel
        </Link>
        <button type="submit">
            Create task
        </button>
      </div>
    </form>
  )
}