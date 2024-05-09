<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $projects = Project::all();
        return Inertia::render('Project/Index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'project_name' => 'required',
            'person' => 'required',
            'company' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'price' => 'required',
            'bill' => 'numeric',
        ]);

        try {
            Project::create($validate);
            return back()->with('success', 'Success create new project!');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {

        return Inertia::render('Project/Detail', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
        $validate = $request->validate([
            'project_name' => 'required',
            'person' => 'required',
            'company' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'price' => 'required|numeric',
        ]);

        try {
            $project->update([
                'project_name' => $request->project_name,
                'person' => $request->person,
                'company' => $request->company,
                'email' => $request->email,
                'phone' => $request->phone,
                'price' => $request->price,
                'bill' => $request->bill,
                'updated_by' => Auth::user()->id,
            ]);
            return back()->with('success', 'Project deleted successfully');
        } catch (\Throwable $th) {
            return back()->with(['warning' => $th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        try {
            $project->delete();
            return back()->with('success', 'Project deleted successfully');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }
}
