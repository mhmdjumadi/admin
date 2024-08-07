<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
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
     * Display a listing of the resource.
     */
    public function indexAPI(): JsonResponse
    {
        $projects = Project::all();
        return response()->json($projects);
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
            'billing_amount' => 'numeric',
            'billing_month' => 'required',
        ]);

        try {
            Project::create($validate);
            return back()->with('success', 'Project created successfully!!');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('invoices');
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
            'billing_month' => 'required',
        ]);

        try {
            $project->update([
                'project_name' => $request->project_name,
                'person' => $request->person,
                'company' => $request->company,
                'email' => $request->email,
                'phone' => $request->phone,
                'price' => $request->price,
                'billing_amount' => $request->billing_amount,
                'billing_month' => $request->billing_month,
                'updated_by' => Auth::user()->id,
            ]);
            return back()->with('success', 'Project updated successfully!!');
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
            return back()->with('success', 'Project deleted successfully!!');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }
}
